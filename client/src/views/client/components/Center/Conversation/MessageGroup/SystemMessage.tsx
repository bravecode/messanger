import React from 'react';

export interface ISystemMessageProps {
    value: string;
}

const SystemMessage: React.FC<ISystemMessageProps> = ({
    value
}) => {
    return (
        <div className="w-full flex justify-center my-2.5">
            <div className="p-2.5 leading-normal text-xs rounded-md bg-custom-gray-lightest text-black">
                { value }
            </div>
        </div>
    );
}

export { SystemMessage }