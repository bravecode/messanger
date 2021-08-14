import React from 'react';
import { useDispatch } from 'react-redux';
import { UserAvatar } from '_components/user/UserAvatar';
import { acceptRequest, declineRequest } from '_store/ducks/relationship/actions';

export interface IFriendsIncomingRequestProps {
    requestID: number;
    userID: number;
    username: string;
}

const FriendsIncomingRequest: React.FC<IFriendsIncomingRequestProps> = ({
    requestID,
    username
}) => {
    const dispatch = useDispatch();

    const handleRequestAccept = () => {
        dispatch(acceptRequest(requestID));
    }

    const handleRequestDecline = () => {
        dispatch(declineRequest(requestID));
    }

    return (
        <div className="flex items-center">
            <UserAvatar />
            <div className="px-4">
                <div className="text-black text-sm text-bold mb-0.5">
                    { username }
                </div>
                <div className="text-gray-500 text-xs">
                    Incoming Request
                </div>
                <button onClick={handleRequestAccept}>
                    Accept
                </button>
                <button onClick={handleRequestDecline}>
                    Decline
                </button>
            </div>
        </div>
    );
}

export { FriendsIncomingRequest }
