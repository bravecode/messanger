import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IStore } from '_store';
import logoPath from '_assets/svg/logo.svg';
import { getProfileRequest } from '_store/ducks/auth/actions';
import { connectRequest } from '_store/ducks/socket/actions';

// Views
import Welcome from 'views/welcome';
import Messanger from 'views/messanger';
import { Spinner } from '_components/spinner/Spinner';
import { getRelationshipsRequest } from '_store/ducks/relationship/actions';

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
    }, [user, dispatch]);

    useEffect(() => {
        if (connection) {
            connection.addEventListener('message', (e) => {
                if (!e.data) return;
    
                const data = JSON.parse(e.data);
    
                if (data.event === "relationship:refresh") {
                    dispatch(getRelationshipsRequest())
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
        <div className="font-Poppins h-screen w-screen bg-gray-200">
    
            <nav className="p-5 relative top-0 inset-x-0 flex items-center justify-between">
                <div className="h-16 w-16 flex items-center justify-center bg-black">
                    <img src={logoPath} alt="Bravecode Logo - Lion" />
                </div>
                <div>
                    
                </div>
            </nav>
    
            <main className="container mx-auto bg-white rounded-lg">
    
                <Switch>
                    <Route exact path="/welcome" component={Welcome} />
                    <Route exact path="/" component={Messanger} />
                </Switch>
    
            </main>
    
        </div>
    );
}

export default TemplateDefault;
