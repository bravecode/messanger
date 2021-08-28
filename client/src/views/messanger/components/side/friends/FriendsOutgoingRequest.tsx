import React from 'react';

import { UserAvatar } from '_components/user/UserAvatar';

export interface IFriendsOutgoingRequestProps {
    requestID: number;
    username: string;
}

const FriendsOutgoingRequest: React.FC<IFriendsOutgoingRequestProps> = ({
    requestID,
    username
}) => {
    return (
        <div className="flex items-center">
            <UserAvatar />
            <div className="px-4">
                <div className="text-black text-sm text-bold mb-0.5">
                    { username }
                </div>
                <div className="text-gray-500 text-xs">
                    Outgoing Request
                </div>
            </div>
        </div>
    )
}

export { FriendsOutgoingRequest }
