import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logoPath from '_assets/svg/logo.svg';

// Views
import Welcome from 'views/welcome';
import Messanger from 'views/messanger';

const TemplateDefault: React.FC = () => (
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

export default TemplateDefault;
