import React from 'react';
import classNames from 'classnames';

import { FooterGameButton } from './FooterGameButton';

export interface IFooterGameProps {
    open: boolean;
    onSelect: (value: string) => void;
}

const FooterGame: React.FC<IFooterGameProps> = ({
    open,
    onSelect
}) => {
    const _containerStyles = classNames({
        'absolute bottom-full left-0 bg-white shadow-md p-2.5 flex rounded-lg': true,
        'hidden': !open,
    });

    return (
        <div className={_containerStyles}>
            <FooterGameButton symbol="✋" label="Paper" onSelect={onSelect} />
            <FooterGameButton symbol="✌" label="Scissors" onSelect={onSelect} />
            <FooterGameButton symbol="✊" label="Rock" onSelect={onSelect} />
        </div>
    );
}

export { FooterGame }
