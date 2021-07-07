import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Views
import Welcome from '../../views/welcome';

const TemplateDefault: React.FC = () => (
    <Switch>
        <Route exact path="/" component={Welcome} />
    </Switch>
);

export default TemplateDefault;
