import React from 'react';
import { IoCheckmark, IoClose } from 'react-icons/io5';

export interface IRequestItemProps {
    userName: string;
}

const RequestsItem: React.FC<IRequestItemProps> = ({
    userName
}) => {
    return (
        <div className="w-full flex items-center gap-2.5 relative group text-sm">
            <div className="flex items-center justify-center h-8 w-8 rounded-full text-white bg-custom-backgorund">
                { userName[0] }
            </div>
            <div>
                { userName }
            </div>
            <div className="absolute right-0 top-0 h-full flex items-center gap-2.5 opacity-0 group-hover:opacity-100">
                <button className="h-5 w-5 flex items-center justify-center rounded-md bg-purple-500 hover:bg-purple-600">
                    <IoCheckmark color="#FFFFFF" size="14px" />
                </button>
                <button className="h-5 w-5 flex items-center justify-center rounded-md border border-custom-gray-regular text-custom-gray-regular hover:bg-red-500 hover:text-white hover:border-opacity-0">
                    <IoClose color="inherit" size="14px" />
                </button>
            </div>
        </div>
    );
}

export { RequestsItem }
