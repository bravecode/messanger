import React from 'react';
import { IoHappy, IoThumbsUp } from 'react-icons/io5';

const FooterEmoji: React.FC = () => {
    return (
        <>
            <div className="h-10 w-10 rounded-md flex items-center justify-center text-custom-gray-dark bg-custom-gray-lightest flex-shrink-0">
                <IoHappy color="inherit" />
            </div>
            <div className="h-10 w-10 rounded-md flex items-center justify-center text-custom-gray-dark bg-custom-gray-lightest flex-shrink-0">
                <IoThumbsUp color="inherit" />
            </div>
        </>
    );
}

export { FooterEmoji }