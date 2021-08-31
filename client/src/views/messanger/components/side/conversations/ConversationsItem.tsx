import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { UserAvatar } from '_components/user/UserAvatar';
import { IStore } from '_store';

export interface ConversationsItemProps {
    relationshipID: number;
    lastMessage: string;
    active?: boolean;
    onConversationSelect: (ID: number) => void;
}

const ConversationsItem: React.FC<ConversationsItemProps> = ({
    relationshipID,
    lastMessage,
    active,
    onConversationSelect
}) => {
    const friends = useSelector((store: IStore) => store.relationship.friends);
    const user = friends.find((friend) => friend.ID === relationshipID);

    // Handlers
    const handleClick = () => {
        onConversationSelect(relationshipID);
    }

    if (!user) {
        return null;
    }

    const _containerStyles = classNames({
        'flex items-center cursor-pointer': true,
        'bg-gray-100': active
    });

    return (
        <div className={_containerStyles} onClick={handleClick}>
            <UserAvatar />
            <div className="px-2.5">
                <div className="text-black text-sm text-bold mb-0.5">
                    { user.userName } <span className="text-xs text-gray-300">3h ago</span>
                </div>
                <div className="text-gray-500 text-xs">
                    { lastMessage }
                </div>
            </div>
        </div>
    );
}

export { ConversationsItem }