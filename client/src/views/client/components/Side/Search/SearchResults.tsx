import React from 'react';
import { useSelector } from 'react-redux';

import { IStore } from '_store';

// Components
import { SearchResultsItem } from './SearchResultsItem';

const SearchResults: React.FC = () => {
    const { users } = useSelector((store: IStore) => store.search);
    const { friends, incomingRequests, outgoingRequests } = useSelector((store: IStore) => store.relationship)

    if (!users.length) {
        return null;
    }

    const requests = [
        ...friends,
        ...incomingRequests,
        ...outgoingRequests
    ];

    return (
        <div className="grid gap-2.5 py-5">
            
            {
                users.map((user) =>
                    <SearchResultsItem
                        userID={user.ID}
                        userName={user.username}
                        requests={requests}
                    />   
                )
            }

        </div>
    );
}

export { SearchResults }