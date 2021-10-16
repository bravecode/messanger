import React from 'react';

import { makeGameMove, TGameChoice } from '_services/game.service';

// Components
import { FooterGameMenuItem } from './FooterGameMenuItem';

export interface IFooterGameMenuProps {
    relationshipID: number;
    open?: boolean;
    onClose?: () => void;
}

const FooterGameMenu: React.FC<IFooterGameMenuProps> = ({
    relationshipID,
    open,
    onClose
}) => {
    if (!open) {
        return null;
    }

    // Handlers
    const handleGameMenuItemSelect = (value: string) => {
        const choice = translateUserChoice(value);

        if (!choice) return;

        makeGameMove(relationshipID, choice);

        onClose && onClose();
    }

    // Helpers
    const translateUserChoice = (value: string): TGameChoice | undefined => {
        if (value === "👊") {
            return 'rock';
        }

        if (value === "✋") {
            return 'paper';
        }

        if (value === "✌️") {
            return 'scissors';
        }

        return undefined;
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