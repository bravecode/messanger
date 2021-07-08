import React from 'react';

import { SideProfile } from './SideProfile';
import { SideMenu } from './SideMenu';
import { Conversations } from './conversations/Conversations';

const Side: React.FC = () => {
    return (
        <div className="px-5 pb-5 pt-2.5">
            <SideProfile />

            <SideMenu />
            
            <Conversations />
        </div>
    );
}

export { Side }
