import React from 'react';
import classNames from 'classnames';

import { TMessageGroupType } from './MessageGroup';

export interface IMessageProps {
    value: string;
    type: TMessageGroupType;
    last?: boolean;
}

const Message: React.FC<IMessageProps> = ({
    value,
    type,
    last
}) => {
    const _containerStyles = classNames({
        'p-2.5 leading-normal text-xs rounded-t-md': true,
        'bg-custom-gray-lightest text-black ': type === 'received',
        'rounded-br-md': type === 'received' && last,
        'bg-purple-500 text-white ': type === 'sent',
        'rounded-bl-md': type === 'sent' && last,
        'rounded-md': !last
    });

    return (
        <div className={_containerStyles}>
            { value }
        </div>
    );
}

export { Message }

