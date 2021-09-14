import classNames from 'classnames';
import React from 'react';
import { Message } from './Message';

export interface IMessageGroupProps {
    userName: string;
    messages: string[];
    type: TMessageGroupType;
}

export type TMessageGroupType = 'received' | 'sent';

const MessageGroup: React.FC<IMessageGroupProps> = ({
    userName,
    messages,
    type
}) => {
    const _containerStyles = classNames({
        'flex items-end gap-2.5 my-2.5': true,
        'flex-row-reverse': type === 'sent'
    });

    const _groupStyles = classNames({
        'grid gap-1.5': true,
        'pr-20': type === 'received',
        'pl-20': type === 'sent'
    })

    return (
        <div className={_containerStyles}>
            <div className="flex items-center justify-center h-8 w-8 rounded-full text-white bg-custom-backgorund flex-shrink-0">
                { userName[0] }
            </div>
            <div className={_groupStyles}>
                {
                    messages.map((message, i) => 
                        <Message 
                            key={i}
                            value={message}
                            type={type}
                            last={i === messages.length - 1}
                        />
                    )
                }
            </div>
        </div>
    );
};

export { MessageGroup }
