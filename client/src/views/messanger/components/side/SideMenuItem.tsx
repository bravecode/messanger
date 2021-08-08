import React from 'react';
import classNames from 'classnames';
import { TActiveMenuItem } from './Side';

export interface ISideMenuItemProps {
    value: TActiveMenuItem;
    activeMenuItem?: TActiveMenuItem;
    onSelect?: (value: TActiveMenuItem) => void;
}

const SideMenuItem: React.FC<ISideMenuItemProps> = ({
    value,
    activeMenuItem,
    onSelect,
    children
}) => {
    const _containerStyles = classNames({
        'h-full flex items-center justify-center': true,
        'text-gray-400 hoer:text-black': value !== activeMenuItem,
        'text-black': value === activeMenuItem
    });

    const handleClick = () => {
        onSelect && onSelect(value);
    }

    return (
        <button className={_containerStyles} onClick={handleClick}>
            { children }
        </button>
    )
}

export { SideMenuItem }