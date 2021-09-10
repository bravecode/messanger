import React from 'react';

import { UserAvatar } from '_components/user/UserAvatar';

const SideProfile: React.FC = () => (
    <div className="h-20 flex items-center">
        <UserAvatar />
        <div className="px-4">
            <div className="text-black text-sm text-bold mb-0.5">
                Krzysztof Szymański
            </div>
            <div className="text-gray-500 text-xs">
                Working on a new project.
            </div>
        </div>
    </div>
);

export { SideProfile }
