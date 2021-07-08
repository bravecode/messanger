import React from 'react';
import classNames from 'classnames';

import { UserAvatar } from '@components/user/UserAvatar';
import { Message } from './Message';

export interface IMessageGroupProps {
    author: {
        username: string;
        avatar?: string;
    }
    messages: string[];
    type: TMessageGroupType;
}

export type TMessageGroupType = 'received' | 'sent';

const MessageGroup: React.FC<IMessageGroupProps> = ({
    author,
    messages,
    type
}) => {
    const _containerStyles = classNames({
        'flex items-end gap-2.5 my-2.5': true,
        'flex-row-reverse': type === 'sent'
    });

    return (
        <div className={_containerStyles}>
            <div >
                <UserAvatar />
            </div>
            <div className="grid gap-1.5">
                {
                    messages.map((message, i) => 
                        <Message 
                            key={i}
                            value={message}
                            type={type}
                        />
                    )
                }
                <p className="text-xs text-gray-400">
                    Message seen 1:22pm
                </p>
            </div>
        </div>
    );
};

export { MessageGroup }
