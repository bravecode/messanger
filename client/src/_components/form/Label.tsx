import React from 'react';
import classNames from 'classnames';

export interface ILabelProps {
    htmlFor: string;
    className?: string;
}

const Label: React.FC<ILabelProps> = ({
    htmlFor,
    className,
    children
}) => {
    const _containerStyles = classNames({
        'text-gray-900 inline-block text-sm mb-2.5': true,
        [className as string]: className
    });

    return (
        <label htmlFor={htmlFor} className={_containerStyles}>
            { children }
        </label>
    );
}

export { Label }
