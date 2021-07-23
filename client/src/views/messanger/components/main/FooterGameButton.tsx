import React from 'react';
import { IEmojiProps, Emoji } from '_components/emoji/Emoji';

export interface IFooterGameButtonProps extends IEmojiProps {
    onSelect: (value: string) => void;
}

const FooterGameButton: React.FC<IFooterGameButtonProps> = ({
    label,
    symbol,
    onSelect
}) => {
    const handleSelect = () => {
        onSelect(symbol);
    }

    return (
        <button className="h-16 w-16 flex items-center justify-center hover:bg-gray-100 transition" onClick={handleSelect}>
            <Emoji symbol={symbol} label={label} className="text-3xl" />
        </button>
    );
}

export { FooterGameButton }
