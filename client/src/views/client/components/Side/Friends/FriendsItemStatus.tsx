import classNames from 'classnames';
import React from 'react';

export interface IFriendsItemStatusProps {
    online?: boolean;
}

const FriendsItemStatus: React.FC<IFriendsItemStatusProps> = ({ online }) => {
    const _containerStyles = classNames({
        'h-2 w-2 rounded-full absolute right-0 bottom-0 border-2 border-custom-gray-lightest': true,
        'bg-green-500': online,
        'bg-custom-gray-regular': !online
    })

    return <div className={_containerStyles} />
}

export { FriendsItemStatus }
