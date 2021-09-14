import classNames from 'classnames';
import React, { useState } from 'react';
import { IoGameController } from 'react-icons/io5';

// Components
import { FooterGameAlert } from './FooterGameAlert';
import { FooterGameMenu } from './FooterGameMenu';

const FooterGame: React.FC = () => {
    const [open, setOpen] = useState(false);

    // Handlers
    const handleGameMenuToggle = () => {
        setOpen((prev) => !prev);
    }

    // Styles
    const _containerStyles = classNames({
        'h-10 w-10 rounded-md flex items-center justify-center flex-shrink-0 relative hover:bg-purple-500 hover:text-white': true,
        'text-custom-gray-dark bg-custom-gray-lightest': !open,
        'bg-purple-500 text-white': open
    });

    return (
        <button className={_containerStyles} onClick={handleGameMenuToggle}>
            <FooterGameAlert visible />

            <FooterGameMenu open={open} />

            <IoGameController color="inherit" />
        </button>
    );
}

export { FooterGame }