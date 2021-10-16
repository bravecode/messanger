import React from 'react';
import { IoAlert } from 'react-icons/io5';

export interface IFooterGameAlertProps {
    visible?: boolean;
}

const FooterGameAlert: React.FC<IFooterGameAlertProps> = ({
    visible
}) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="absolute bottom-10 left-0 mb-2.5 h-6 w-64">
            <div className="h-6 w-6 rounded-full bg-purple-500 text-white flex items-center justify-center absolute left-0 top-0">
                <IoAlert size="14px" color="inherit" />
            </div>
            <div className="bg-custom-gray-lightest h-6 pr-2.5 pl-9 rounded-l-full rounded-r-md text-xs flex items-center text-black">
                New game has been started. <span className="text-purple-500 pl-1">Your turn.</span>
            </div>
        </div>
    );
}

export { FooterGameAlert }