import React from 'react';
import classNames from 'classnames';

export interface IEmojiProps {
    label: string;
    symbol: string;
    className?: string;
}

const Emoji: React.FC<IEmojiProps> = ({
    label,
    symbol,
    className
}) => {
    const _containerStyles = classNames({
        '': true,
        [className as string]: className
    });

    return (
        <span className="emoji" role="img" aria-label={label}>
            { symbol }
        </span>
    );
}

export { Emoji }
