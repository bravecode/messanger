import classNames from 'classnames';
import React, { useState } from 'react';
import { IoGameController } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { IStore } from '_store';

// Components
import { FooterGameAlert } from './FooterGameAlert';
import { FooterGameMenu } from './FooterGameMenu';

export interface IFooterGameProps {
    relationshipID: number;
}

const FooterGame: React.FC<IFooterGameProps> = ({
    relationshipID
}) => {
    const { newGame } = useSelector((store: IStore) => store.game);
    const [open, setOpen] = useState(false);

    // Handlers
    const handleGameMenuToggle = () => {
        setOpen((prev) => !prev);
    }

    // Styles
    const _buttonStyles = classNames({
        'h-10 w-10 rounded-md flex items-center justify-center flex-shrink-0 hover:bg-purple-500 hover:text-white': true,
        'text-custom-gray-dark bg-custom-gray-lightest': !open,
        'bg-purple-500 text-white': open
    });

    return (
        <div className="h-10 w-10 relative">
            <FooterGameAlert visible={newGame} />

            <FooterGameMenu relationshipID={relationshipID} open={open} onClose={() => setOpen(false)} />

            <button className={_buttonStyles} onClick={handleGameMenuToggle}>
                <IoGameController color="inherit" />
            </button>
        </div>
    );
}

export { FooterGame }