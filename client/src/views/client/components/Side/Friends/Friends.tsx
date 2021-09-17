import React from 'react';
import { useSelector } from 'react-redux';

import { IStore } from '_store';

// Components
import { FriendsItem } from './FriendsItem';

const Friends: React.FC = () => {
    const { friends } = useSelector((store: IStore) => store.relationship);
    const { conversations } = useSelector((store: IStore) => store.conversations);

    if (!friends.length) {
        return null;
    }

    // Helpers
    const getLastMessage = (relationID: number): string => {
        return conversations.find((conversation) => conversation.relationID === relationID)?.lastMessage ?? 'Say hello to your friend.';
    }

    return (
        <div className="mt-5">
            {
                friends.map((friend) =>
                    <FriendsItem
                        userName={friend.userName}
                        lastMessage={getLastMessage(friend.ID)}
                        online={friend.online}
                    />
                )
            }
        </div>
    );
}

export { Friends }