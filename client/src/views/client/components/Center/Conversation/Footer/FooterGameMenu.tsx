import React from 'react';
import { Emoji } from '_components/emoji/Emoji';
import { FooterGameMenuItem } from './FooterGameMenuItem';

export interface IFooterGameMenuProps {
    open?: boolean;
}

const FooterGameMenu: React.FC<IFooterGameMenuProps> = ({
    open
}) => {
    if (!open) {
        return null;
    }

    // Handlers
    const handleGameMenuItemSelect = (value: string) => {
        console.log(value);
    }

    return (
        <div className="w-auto absolute bottom-full left-0 mb-2.5 bg-white shadow-md p-2.5 rounded-md text-black">
            
            <div className="text-sm font-semibold pb-2.5">
                Make your choice
            </div>
            
            <div className="flex gap-2.5">
                <FooterGameMenuItem
                    symbol="👊"
                    label="Rock"
                    onSelect={handleGameMenuItemSelect}
                />
                
                <FooterGameMenuItem
                    symbol="✋"
                    label="Paper"
                    onSelect={handleGameMenuItemSelect}
                />

                <FooterGameMenuItem
                    symbol="✌️"
                    label="Scissors"
                    onSelect={handleGameMenuItemSelect}
                />
            </div>

        </div>
    );
}

export { FooterGameMenu }