import React from 'react';

export interface IRequestsMoreProps {
    expanded?: boolean;
    onExpandToggle: () => void;
}

const RequestsMore: React.FC<IRequestsMoreProps> = ({
    expanded,
    onExpandToggle
}) => {
    // Handlers
    const handleClick = () => {
        onExpandToggle();
    }

    return (
        <button className="w-full h-8 border border-custom-gray-light text-custom-gray-regular flex items-center justify-center text-xs rounded-md hover:bg-purple-500 hover:text-white" onClick={handleClick}>
            { expanded ? 'Show less' : 'Show More (3)' }
        </button>
    );
}

export { RequestsMore }