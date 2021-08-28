import React from 'react';
import { useSelector } from 'react-redux';

import { UserAvatar } from '_components/user/UserAvatar';
import { IStore } from '_store';

export interface ConversationsItemProps {
    relationshipID: number;
    lastMessage?: string;
}

const ConversationsItem: React.FC<ConversationsItemProps> = ({
    relationshipID,
    lastMessage
}) => {
    const friends = useSelector((store: IStore) => store.relationship.friends);
    const user = friends.find((friend) => friend.ID === relationshipID);

    if (!user) {
        return null;
    }

    return (
        <div className="flex items-center">
            <UserAvatar />
            <div className="px-2.5">
                <div className="text-black text-sm text-bold mb-0.5">
                    { user.userName } <span className="text-xs text-gray-300">3h ago</span>
                </div>
                <div className="text-gray-500 text-xs">
                    { lastMessage ?? 'Say hello to your friend.' }
                </div>
            </div>
        </div>
    );
}

export { ConversationsItem }