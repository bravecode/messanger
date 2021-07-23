import React from 'react';

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
    return (
        <span className={className} role="img" aria-label={label}>
            { symbol }
        </span>
    );
}

export { Emoji }
