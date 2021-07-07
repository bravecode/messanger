import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Templates
import TemplateDefault from '../templates/default';

const Router: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={TemplateDefault} />
        </Switch>
    </BrowserRouter>
);

export { Router }
