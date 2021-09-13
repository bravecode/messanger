import classNames from 'classnames';
import React from 'react';

// Components
import { FriendsItemStatus } from './FriendsItemStatus';

export interface IFriendsItemProps {
    userName: string;
    lastMessage: string;
    online?: boolean;
    active?: boolean;
}

const FriendsItem: React.FC<IFriendsItemProps> = ({
    userName,
    lastMessage,
    online,
    active
}) => {
    const _containerStyles = classNames({
        'h-10 w-full flex gap-2.5 items-center px-5 relative cursor-pointer hover:bg-white': true,
        'bg-white': active
    });

    return (
        <div className={_containerStyles}>
            { active && <div className="w-0.5 h-full bg-purple-500 absolute top-0 left-0" /> }
            <div className="flex items-center justify-center h-8 w-8 rounded-full text-white bg-custom-backgorund relative">
                { userName[0] }
                <FriendsItemStatus online={online} />
            </div>
            <div>
                <div className="text-sm leading-none">
                    { userName }
                </div>
                <div className="text-xs text-custom-gray-regular leading-none pt-1">
                    { lastMessage }
                </div>
            </div>
        </div>
    );
}

export { FriendsItem }