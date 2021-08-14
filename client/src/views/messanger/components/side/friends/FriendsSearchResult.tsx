import React from 'react';
import { useSelector } from 'react-redux';

import { IStore } from '_store';
import { FriendsSearchResultItem } from './FriendsSearchResultItem';

const FriendsSearchResult: React.FC = () => {
    const { users } = useSelector((store: IStore) => store.search);

    const handleInvite = (userID: number) => {
        console.log('Invite user: ', userID)
    }
    
    return (
        <div>
            {
                users.map((user) => 
                    <FriendsSearchResultItem 
                        key={user.ID}
                        userID={user.ID}
                        username={user.username}
                        onInvite={handleInvite}
                    />
                )
            }
        </div>
    )
}

export { FriendsSearchResult }
