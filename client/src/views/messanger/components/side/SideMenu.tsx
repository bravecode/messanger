import React from 'react';
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
   
        </nav>
    );
}

export { SideMenu }