import React from 'react';

// Components
import { FriendsItem } from './FriendsItem';

const Friends: React.FC = () => {
    return (
        <div className="mt-5">
            <FriendsItem
                userName="Zoe Doe"
                lastMessage="Lorem ipsum dolor sit amet..."
                online
            />

            <FriendsItem
                userName="Krzysztof Szymański"
                lastMessage="Lorem ipsum dolor sit amet..."
                online
                active
            />

            <FriendsItem
                userName="Bosch"
                lastMessage="Say hello to your friend."
            />
        </div>
    );
}

export { Friends }