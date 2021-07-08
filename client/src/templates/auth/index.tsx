import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import logoPath from '_assets/svg/logo.svg';

// Views
import Register from 'views/register';
import Login from 'views/login';

const TemplateAuth: React.FC = () => (
    <div className="font-Poppins bg-gray-200 h-screen w-screen">

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

export default TemplateAuth;
