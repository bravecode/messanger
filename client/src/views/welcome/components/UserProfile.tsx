import React from 'react';

import { UserAvatar } from '../../../_components/user/UserAvatar';

const UserProfile: React.FC = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
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
        </div>
    );
}

export { UserProfile }
