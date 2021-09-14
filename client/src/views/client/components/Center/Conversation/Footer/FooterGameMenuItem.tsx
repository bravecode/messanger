import React from 'react';

// Components
import { Emoji } from '_components/emoji/Emoji';

export interface IFooterGameMenuItemProps {
    symbol: string;
    label: string;
    onSelect: (value: string) => void;
}

const FooterGameMenuItem: React.FC<IFooterGameMenuItemProps> = ({
    symbol,
    label,
    onSelect
}) => {
    // Handlers
    const handleClick = () => {
        onSelect(symbol);
    }

    return (
        <button className="h-10 w-10 rounded-md bg-custom-gray-lightest text-custom-gray-regular flex items-center justify-center hover:bg-purple-500" onClick={handleClick}>
            <Emoji symbol={symbol} label={label} />
        </button>
    );
}

export { FooterGameMenuItem }
