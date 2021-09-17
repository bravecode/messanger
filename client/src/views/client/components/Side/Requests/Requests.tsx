import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';

import { IStore } from '_store';

// Components
import { RequestsItem } from './RequestsItem';
import { RequestsMore } from './RequestsMore';

export interface IRequestsProps {
    expanded?: boolean;
    onExpandToggle: () => void;
}

const Requests: React.FC<IRequestsProps> = ({
    expanded,
    onExpandToggle
}) => {
    const { incomingRequests } = useSelector((store: IStore) => store.relationship);

    if (!incomingRequests.length) {
        return null;
    }

    const _containerStyles = classNames({
        'w-full grid gap-2.5 p-5': true,
        'absolute left-0 bottom-0': !expanded
    });

    return (
        <div className={_containerStyles}>
            <div className="w-full font-semibold text-xs">
                Incoming Requests
            </div>

            {
                incomingRequests.slice(0, 2).map((request) =>
                    <RequestsItem key={request.ID} requestID={request.ID} userName={request.userName} />
                )
            }
            
            {
                incomingRequests.length > 2 && (
                    <RequestsMore onExpandToggle={onExpandToggle} expanded={expanded} />
                )
            }
        </div>
    );
}

export { Requests }