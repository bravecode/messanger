import React from 'react';

const RequestsMore: React.FC = () => {
    return (
        <button className="w-full h-8 border border-custom-gray-light text-custom-gray-regular flex items-center justify-center text-xs rounded-md hover:bg-purple-500 hover:text-white">
            Show More (3)
        </button>
    );
}

export { RequestsMore }