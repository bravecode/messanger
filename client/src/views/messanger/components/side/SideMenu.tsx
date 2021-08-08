import React from 'react';
import { LogoutIcon, ChatIcon, UsersIcon, CogIcon } from '@heroicons/react/outline';
import { SideMenuItem } from './SideMenuItem';
import { TActiveMenuItem } from './Side';

export interface ISideMenuProps {
    activeMenuItem: TActiveMenuItem;
    onActiveMenuItemChange: (value: TActiveMenuItem) => void;
}

const SideMenu: React.FC<ISideMenuProps> = ({
    activeMenuItem,
    onActiveMenuItemChange
}) => {
    return (
        <nav className="h-10 grid grid-cols-4 mb-8 bg-gray-100">
            <SideMenuItem value="conversations" activeMenuItem={activeMenuItem} onSelect={onActiveMenuItemChange}>
                <ChatIcon className="w-5" />
            </SideMenuItem>
            <SideMenuItem value="friends" activeMenuItem={activeMenuItem} onSelect={onActiveMenuItemChange}>
                <UsersIcon className="w-5" />    
            </SideMenuItem>
            <SideMenuItem value="settings" activeMenuItem={activeMenuItem} onSelect={onActiveMenuItemChange}>
                <CogIcon className="w-5" />
            </SideMenuItem>
            <SideMenuItem value="logout">
                <LogoutIcon className="w-5" />
            </SideMenuItem>
        </nav>
    );
}

export { SideMenu }