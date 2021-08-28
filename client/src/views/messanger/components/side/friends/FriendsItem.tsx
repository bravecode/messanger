import React from 'react';
import { useDispatch } from 'react-redux';
import { UserAvatar } from '_components/user/UserAvatar';
import { openConversationRequest } from '_store/ducks/conversations/actions';

export interface IFriendsItemProps {
    requestID: number;
    userID: number;
    username: string;
    online?: boolean;
}

const FriendsItem: React.FC<IFriendsItemProps> = ({
    requestID,
    userID,
    username,
    online
}) => {
    const dispatch = useDispatch();

    // Handle Open Conversation
    const handleOpenConversation = () => {
        dispatch(openConversationRequest(requestID))
    }

    return (
        <div className="flex items-center" onClick={handleOpenConversation}>
            <UserAvatar />
            <div className="px-4">
                <div className="text-black text-sm text-bold mb-0.5">
                    { username }
                </div>
                <div className="text-gray-500 text-xs">
                    { online ? 'Online' : 'Offline' }
                </div>
            </div>
        </div>
    );
}

export { FriendsItem }
