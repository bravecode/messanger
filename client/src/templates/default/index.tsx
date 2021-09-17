import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IStore } from '_store';
import logoPath from '_assets/svg/logo.svg';
import { getProfileRequest } from '_store/ducks/auth/actions';
import { connectRequest } from '_store/ducks/socket/actions';
import { Spinner } from '_components/spinner/Spinner';
import { getRelationshipsRequest, updateUserStatus } from '_store/ducks/relationship/actions';
import { getConversationMessagesRequest } from '_store/ducks/messages/actions';

// Views
import Client from 'views/client';

const TemplateDefault: React.FC = () => {
    // Store
    const dispatch = useDispatch();
    const { user, pending } = useSelector((store: IStore) => store.auth);
    const { connection, connected, pending: socketPending } = useSelector((store: IStore) => store.socket);

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
    
                console.log(data);

                if (data.event === "RELATIONSHIP:REFRESH") {
                    dispatch(getRelationshipsRequest())
                }

                if (data.event === "CONVERSATION:MESSAGE:RECEIVED") {
                    const { relationshipID } = data;

                    dispatch(getConversationMessagesRequest(relationshipID))
                }

                if (data.event === "USER:STATUS") {
                    const { id, online } = data;

                    dispatch(updateUserStatus({
                        userID: id,
                        online
                    }))
                }
            })
        }
    }, [connection, dispatch])

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
