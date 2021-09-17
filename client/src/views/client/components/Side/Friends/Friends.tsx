import React from 'react';
import { useSelector } from 'react-redux';

import { IStore } from '_store';

// Components
import { FriendsItem } from './FriendsItem';

const Friends: React.FC = () => {
    const { friends } = useSelector((store: IStore) => store.relationship);
    const { activeConversationID } = useSelector((store: IStore) => store.messages);

    if (!friends.length) {
        return null;
    }

    return (
        <div className="mt-5">
            {
                friends.map((friend) =>
                    <FriendsItem
                        key={friend.ID}
                        requestID={friend.ID}
                        userName={friend.userName}
                        lastMessage={friend.lastMessage ?? ''}
                        online={friend.online}
                        active={activeConversationID === friend.ID}
                    />
                )
            }
        </div>
    );
}

export { Friends }