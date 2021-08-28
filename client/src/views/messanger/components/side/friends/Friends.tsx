import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserAvatar } from '_components/user/UserAvatar';
import { IStore } from '_store';
import { getRelationshipsRequest } from '_store/ducks/relationship/actions';
import { FriendsIncomingRequest } from './FriendsIncomingRequest';
import { FriendsItem } from './FriendsItem';
import { FriendsOutgoingRequest } from './FriendsOutgoingRequest';
import { FriendsSearch } from './FriendsSearch';

const Friends: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRelationshipsRequest())
    }, []);

    const { friends, outgoingRequests, incomingRequests } = useSelector((store: IStore) => store.relationship);

    return (
        <div className="grid gap-4">
            <FriendsSearch />

            {
                friends.map((friend) =>
                    <FriendsItem
                        key={friend.ID}
                        requestID={friend.ID}
                        userID={friend.userID}
                        username={friend.userName}
                        online={friend.online}
                    />
                )
            }

            {
                incomingRequests.map((request) =>
                    <FriendsIncomingRequest
                        key={request.ID}
                        requestID={request.ID}
                        userID={request.userID}
                        username={request.userName}
                    />
                )
            }

            {
                outgoingRequests.map((request) =>
                    <FriendsOutgoingRequest
                        key={request.ID}
                        requestID={request.ID}
                        username={request.userName}
                    />
                )
            }
        </div>
    );
}

export { Friends }