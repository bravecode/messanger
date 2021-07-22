import React from 'react';
import {
    LogoutIcon,
    ChatIcon,
    UsersIcon,
    CogIcon
} from '@heroicons/react/outline';

const SideMenu: React.FC = () => {
    return (
        <nav className="h-10 grid grid-cols-4 mb-8 bg-gray-100">
            <div className="h-full flex items-center justify-center">
                <ChatIcon className="text-gray-400 w-5" />
            </div>
            <div className="h-full flex items-center justify-center">
                <UsersIcon className="text-gray-400 w-5" />
            </div>
            <div className="h-full flex items-center justify-center">
                <CogIcon className="text-gray-400 w-5" />
            </div>
            <div className="h-full flex items-center justify-center">
                <LogoutIcon className="text-gray-400 w-5" />
            </div>
        </nav>
    );
}

export { SideMenu }