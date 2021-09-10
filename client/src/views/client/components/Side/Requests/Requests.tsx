import React from 'react';
import { RequestsItem } from './RequestsItem';
import { RequestsMore } from './RequestsMore';

const Requests: React.FC = () => {
    return (
        <div className="w-full grid gap-2.5 absolute p-5 left-0 bottom-0">
            <div className="w-full font-semibold text-xs">
                Incoming Requests
            </div>
            <RequestsItem userName="John Doe" />
            <RequestsItem userName="Jean Paul" />
            <RequestsMore />
        </div>
    );
}

export { Requests }