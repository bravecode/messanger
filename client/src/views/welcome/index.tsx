import React from 'react';

import { UserProfile } from './components/UserProfile';
import { Tabs } from './components/Tabs';
import { Message } from './components/Message';

const Welcome: React.FC = () => (
    <div className="grid grid-cols-3">

        <div className="p-5">
            <UserProfile />
            <Tabs />
            <div className="grid gap-4">
            <Message />
            <Message />
            <Message />
            <Message />
            </div>
        </div>

        <div className="p-5 col-span-2">
            Messanger
        </div>

    </div>
);

export default Welcome;
