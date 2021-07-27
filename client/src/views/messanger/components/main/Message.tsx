import React from 'react';
import classNames from 'classnames';

import { TMessageGroupType } from './MessageGroup';

export interface IMessageProps {
    value: string;
    type: TMessageGroupType;
}

const Message: React.FC<IMessageProps> = ({
    value,
    type
}) => {
    const _containerStyles = classNames({
        'p-2.5 leading-normal text-sm rounded-t-lg': true,
        'bg-gray-200 text-gray-800 rounded-br-lg': type === 'received',
        'bg-blue-500 text-white rounded-bl-lg': type === 'sent'
    });

    return (
        <div className={_containerStyles}>
            { value }
        </div>
    );
}

export { Message }

