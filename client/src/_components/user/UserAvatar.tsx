import React from 'react';

import { UserStatus } from './UserStatus';

export interface IUserAvatarProps {
    username: string;
    src?: string;
}

const UserAvatar: React.FC = () => {
    return (
        <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center relative">
            <span>
                KS
            </span>
            <UserStatus />
        </div>
    );
}

export { UserAvatar }
