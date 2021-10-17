import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import { IStore } from '_store';
import logoPath from '_assets/svg/logo.svg';

// Views
import Register from 'views/register';
import Login from 'views/login';


const TemplateAuth: React.FC = () => {
    const history = useHistory();

    // Store
    const { user } = useSelector((store: IStore) => store.auth);

    // Validate if user is logged in
    useEffect(() => {
        if (user !== undefined && localStorage.getItem('token')) {
            history.push('/');
        }
    }, [user, history]);

    return (
        <div className="font-Poppins bg-gray-200 h-screen w-screen">

            <Helmet>
                <title>Messanger | Auth</title>
            </Helmet>
    
            <nav className="p-5 relative top-0 inset-x-0 flex items-center justify-between">
                <div className="h-16 w-16 flex items-center justify-center bg-black">
                    <img src={logoPath} alt="Bravecode Logo - Lion" />
                </div>
                <div>
                    
                </div>
            </nav>
    
            <main className="container w-96 mx-auto bg-white rounded-lg p-10">
    
                <Switch>
                    <Route exact path="/auth/register" component={Register} />
                    <Route exact path="/auth/login" component={Login} />
                    <Redirect to="/auth/login" />
                </Switch>
    
            </main>
    
        </div>
    );
}

export default TemplateAuth;
