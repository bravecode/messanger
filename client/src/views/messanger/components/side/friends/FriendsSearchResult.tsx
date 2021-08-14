import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IStore } from '_store';
import { inviteRequest } from '_store/ducks/relationship/actions';
import { FriendsSearchResultItem } from './FriendsSearchResultItem';

const FriendsSearchResult: React.FC = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((store: IStore) => store.search);

    const handleInvite = (userID: number) => {
        dispatch(inviteRequest(userID))
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
