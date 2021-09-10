import React from 'react';
import { IoAlert, IoClose } from 'react-icons/io5';
import classNames from 'classnames';

export interface IAlertProps {
    variant: TAlertVariant;
    title: string;
    content: string | string[];
    className?: string;
    onClose?: () => void;
}

export type TAlertVariant = 'success' | 'warning' | 'error';

const Alert: React.FC<IAlertProps> = ({
    variant,
    title,
    content,
    className,
    onClose
}) => {
    const _containerStyles = classNames({
        'border border-solid border-gray-300 rounded-lg p-2.5 flex gap-2': true,
        [className as string]: className
    });

    // Handlers
    const handleClose = () => {
        onClose && onClose();
    }

    // Helpers
    const renderContent = () => {
        if (Array.isArray(content)) {
            return (
                <ul className="list-disc list-inside">
                    {
                        content.map((item, i) =>
                            <li key={i} className="mb-1 last:mb-0">{ item }</li>
                        )
                    }
                </ul>
            );
        }

        return (
            <p>
                { content }
            </p>
        )
    }

    return (
        <div className={_containerStyles}>
            <div className="h-full w-6">
                <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center">
                    <IoAlert className="w-4 text-red-500" />
                </div>
            </div>
            <div className="w-full">
                <header className="h-6 flex items-center justify-between mb-2.5">
                    <h3 className="text-sm">
                        { title }
                    </h3>
                    {
                        onClose && (
                            <button onClick={handleClose} className="text-gray-300 hover:text-black transition">
                                <IoClose className="w-4" />
                            </button>
                        )
                    }
                </header>    
                <div className="text-xs text-gray-400">
                    { renderContent() }    
                </div>
            </div> 
        </div>
    );
}

export { Alert }
