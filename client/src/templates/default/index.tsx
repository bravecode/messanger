import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import { IStore } from '_store';
import logoPath from '_assets/svg/logo.svg';
import { getProfileRequest } from '_store/ducks/auth/actions';
import { connectRequest } from '_store/ducks/socket/actions';
import { Spinner } from '_components/spinner/Spinner';
import { getRelationshipsRequest, updateUserStatus } from '_store/ducks/relationship/actions';
import { refetchConversationMessagesRequest } from '_store/ducks/messages/actions';

// Views
import Client from 'views/client';
import { updateGameScore, startGame } from '_store/ducks/game/actions';

const TemplateDefault: React.FC = () => {
    // Store
    const dispatch = useDispatch();
    const { user, pending } = useSelector((store: IStore) => store.auth);
    const { connection, connected, pending: socketPending } = useSelector((store: IStore) => store.socket);
    const { activeConversationID } = useSelector((store: IStore) => store.messages);

    // Validate if user is logged in
    useEffect(() => {
        if (user === undefined && localStorage.getItem('token')) {
            dispatch(getProfileRequest());
        }

        // Estabilish websockets connection
        if (user !== undefined && localStorage.getItem('token') && !socketPending) {
            dispatch(connectRequest(user.ID));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, dispatch]);

    useEffect(() => {
        if (connection) {
            connection.addEventListener('message', (e) => {
                if (!e.data) return;

                const data = JSON.parse(e.data);

                if (data.event === "RELATIONSHIP:REFRESH") {
                    dispatch(getRelationshipsRequest());
                }

                if (data.event === "CONVERSATION:MESSAGE:RECEIVED") {
                    const { relationshipID } = data;

                    dispatch(refetchConversationMessagesRequest(relationshipID));
                }

                if (data.event === "USER:STATUS") {
                    const { id, online } = data;

                    dispatch(updateUserStatus({
                        userID: id,
                        online
                    }));
                }
            })
        }
    }, [connection, dispatch])

    useEffect(() => {
        if (connection) {
            connection.addEventListener('message', (e) => {
                if (!e.data) return;

                const data = JSON.parse(e.data);

                if (data.event === "GAME:START") {
                    if (data.relationship_id !== activeConversationID) {
                        return;
                    }

                    dispatch(startGame());
                }

                if (data.event === "GAME:RESULT") {
                    if (data.relationship_id !== activeConversationID) {
                        return;
                    }

                    dispatch(updateGameScore(data.score));
                    dispatch(refetchConversationMessagesRequest(data.relationship_id));
                }
            })
        }
    }, [connection, dispatch, activeConversationID])

    if (pending || socketPending) {
        return (
            <div className="h-screen w-screen bg-gray-200 flex items-center justify-center">
                <Spinner className="text-black" />
            </div>
        );
    }

    if (user === undefined || !localStorage.getItem('token') || !connected) {
        return <Redirect to="/auth/login" />
    }

    return (
        <div className="h-screen w-screen relative">

            <Helmet>
                <title>Messanger | Client</title>
            </Helmet>
    
            <nav className="p-5 absolute top-0 inset-x-0 flex items-center justify-between">
                <div className="h-16 w-16 flex items-center justify-center bg-black">
                    <img src={logoPath} alt="Bravecode Logo - Lion" />
                </div>
            </nav>
    
            <Client />
    
        </div>
    );
}

export default TemplateDefault;
