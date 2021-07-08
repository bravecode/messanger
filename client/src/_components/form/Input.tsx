import React from 'react';
import classNames from 'classnames';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const Input: React.FC<IInputProps> = ({
    name,
    id,
    className,
    ...props
}) => {
    const _containerStyles = classNames({
        'bg-gray-100 rounded-lg border-none text-gray-500 outline-none h-10 px-2.5 text-sm w-full': true,
        [className as string]: className
    });

    return (
        <input
            {...props}
            id={id ?? name}
            name={name}
            className={_containerStyles}
        />
    );
}

export { Input }
