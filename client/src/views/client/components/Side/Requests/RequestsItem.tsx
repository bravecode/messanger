import React from 'react';
import { IoCheckmark, IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

import { acceptRequest, declineRequest } from '_store/ducks/relationship/actions';

export interface IRequestItemProps {
    requestID: number;
    userName: string;
}

const RequestsItem: React.FC<IRequestItemProps> = ({
    requestID,
    userName
}) => {
    const dispatch = useDispatch();

    // Handlers
    const handleRequestAccept = () => {
        dispatch(acceptRequest(requestID));
    }

    const handleRequestDecline = () => {
        dispatch(declineRequest(requestID));
    }

    return (
        <div className="w-full flex items-center gap-2.5 relative group text-sm">
            <div className="flex items-center justify-center h-8 w-8 rounded-full text-white bg-custom-backgorund">
                { userName[0] }
            </div>
            <div>
                { userName }
            </div>
            <div className="absolute right-0 top-0 h-full flex items-center gap-1 opacity-0 group-hover:opacity-100">
                <button className="h-5 w-5 flex items-center justify-center rounded-md bg-purple-500 hover:bg-purple-600" onClick={handleRequestAccept}>
                    <IoCheckmark color="#FFFFFF" size="14px" />
                </button>
                <button className="h-5 w-5 flex items-center justify-center rounded-md border border-custom-gray-regular text-custom-gray-regular hover:bg-red-500 hover:text-white hover:border-opacity-0" onClick={handleRequestDecline}>
                    <IoClose color="inherit" size="14px" />
                </button>
            </div>
        </div>
    );
}

export { RequestsItem }
