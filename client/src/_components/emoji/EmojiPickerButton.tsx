import React from 'react';
import { Emoji, IEmojiProps } from './Emoji';

export interface IEmojiPickerButtonProps extends IEmojiProps {
    onSelect: (value: string) => void;
}

const EmojiPickerButton: React.FC<IEmojiPickerButtonProps> = ({
    label,
    symbol,
    onSelect
}) => {
    const handleSelect = () => {
        onSelect(symbol);
    }

    return (
        <button className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 transition" onClick={handleSelect}>
            <Emoji symbol={symbol} label={label} />
        </button>
    );
}

export { EmojiPickerButton }
