import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';

import { getConversationMessagesRequest } from '_store/ducks/messages/actions';

// Components
import { FriendsItemStatus } from './FriendsItemStatus';

export interface IFriendsItemProps {
    requestID: number;
    userName: string;
    lastMessage: string;
    online?: boolean;
    active?: boolean;
}

const FriendsItem: React.FC<IFriendsItemProps> = ({
    requestID,
    userName,
    lastMessage,
    online,
    active
}) => {
    const dispatch = useDispatch();
    
    // Handlers
    const handleConversationOpen = () => {
        if (active) {
            return;
        }

        dispatch(getConversationMessagesRequest(requestID))
    }

    // Styles
    const _containerStyles = classNames({
        'h-10 w-full flex gap-2.5 items-center px-5 relative cursor-pointer hover:bg-white': true,
        'bg-white': active
    });

    return (
        <div className={_containerStyles} onClick={handleConversationOpen}>
            { active && <div className="w-0.5 h-full bg-purple-500 absolute top-0 left-0" /> }
            <div className="flex items-center justify-center h-8 w-8 rounded-full text-white bg-custom-backgorund relative flex-shrink-0">
                { userName[0] }
                <FriendsItemStatus online={online} />
            </div>
            <div>
                <div className="text-sm leading-none">
                    { userName }
                </div>
                <div className="text-xs text-custom-gray-regular leading-none pt-1">
                    { lastMessage.length >= 25 ? lastMessage.slice(0, 25) + '...' : lastMessage }
                </div>
            </div>
        </div>
    );
}

export { FriendsItem }