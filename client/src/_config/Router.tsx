import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Templates
import TemplateDefault from 'templates/default';
import TemplateAuth from 'templates/auth';

// Views
import Logout from 'views/logout';
import Client from 'views/client';

const Router: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/client" component={Client} />
            <Route exact path="/auth/logout" component={Logout} />
            <Route path="/auth" component={TemplateAuth} />
            <Route path="/" component={TemplateDefault} />
        </Switch>
    </BrowserRouter>
);

export { Router }
