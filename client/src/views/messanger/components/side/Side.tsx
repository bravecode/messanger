import React, { useState } from 'react';

import { SideProfile } from './SideProfile';
import { SideMenu } from './SideMenu';
import { Conversations } from './conversations/Conversations';
import { Friends } from './friends/Friends';

export type TActiveMenuItem = 'conversations' | 'friends' | 'settings' | 'logout';

const Side: React.FC = () => {
    const [activeMenuItem, setActiveMenuItem] = useState<TActiveMenuItem>('friends');

    const handleActiveMenuItemChange = (value: TActiveMenuItem) => {
        setActiveMenuItem(value);
    }

    // Helpers
    const renderContent = () => {
        switch (activeMenuItem) {
            case 'conversations':
                return <Conversations />
            case 'friends':
                return <Friends />
            default:
                return <Conversations />
        }
    }

    return (
        <div className="px-5 pb-5 pt-2.5">
            <SideProfile />

            <SideMenu 
                activeMenuItem={activeMenuItem}
                onActiveMenuItemChange={handleActiveMenuItemChange}
            />
            
            { renderContent() }
        </div>
    );
}

export { Side }
