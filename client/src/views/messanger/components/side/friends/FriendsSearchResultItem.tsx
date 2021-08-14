import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '_store';

export interface IFriendsSearchResultItemProps {
    userID: number;
    username: string;
    onInvite: (userID: number) => void;
}

const FriendsSearchResultItem: React.FC<IFriendsSearchResultItemProps> = ({
    userID,
    username,
    onInvite
}) => {
    const { friends, incomingRequests, outgoingRequests } = useSelector((store: IStore) => store.relationship)

    // Handlers
    const handleClick = () => {
        onInvite(userID);
    }

    // Disable when user is already in relation
    const disabled = !!friends.find((user) => user.userID === userID)
        || !!incomingRequests.find((user) => user.userID === userID)
        || !!outgoingRequests.find((user) => user.userID === userID);

    return (
        <div key={userID}>
            { username }
            <button onClick={handleClick} disabled={disabled}>
                Invite
            </button>
        </div>
    );
}

export { FriendsSearchResultItem }
