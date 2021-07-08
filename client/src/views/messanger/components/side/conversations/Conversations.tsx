import React from 'react';

import { UserAvatar } from '../../../../../_components/user/UserAvatar';

const Conversations: React.FC = () => (
    <div className="grid gap-4">
        <div className="flex items-center">
            <UserAvatar />
            <div className="px-2.5">
                <div className="text-black text-sm text-bold mb-0.5">
                    Krzysztof Szymański <span className="text-xs text-gray-300">3h ago</span>
                </div>
                <div className="text-gray-500 text-xs">
                    Hey man, just wanted to ask you abotu something...
                </div>
            </div>
        </div>

        <div className="flex items-center">
            <UserAvatar />
            <div className="px-2.5">
                <div className="text-black text-sm text-bold mb-0.5">
                    Krzysztof Szymański <span className="text-xs text-gray-300">3h ago</span>
                </div>
                <div className="text-gray-500 text-xs">
                    Hey man, just wanted to ask you abotu something...
                </div>
            </div>
        </div>

        <div className="flex items-center">
            <UserAvatar />
            <div className="px-2.5">
                <div className="text-black text-sm text-bold mb-0.5">
                    Krzysztof Szymański <span className="text-xs text-gray-300">3h ago</span>
                </div>
                <div className="text-gray-500 text-xs">
                    Hey man, just wanted to ask you abotu something...
                </div>
            </div>
        </div>

        <div className="flex items-center">
            <UserAvatar />
            <div className="px-2.5">
                <div className="text-black text-sm text-bold mb-0.5">
                    Krzysztof Szymański <span className="text-xs text-gray-300">3h ago</span>
                </div>
                <div className="text-gray-500 text-xs">
                    Hey man, just wanted to ask you abotu something...
                </div>
            </div>
        </div>
    </div>
)

export { Conversations }
