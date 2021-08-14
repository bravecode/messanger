import React from 'react';
import { useDispatch } from 'react-redux';

import { searchUsersRequest } from '_store/ducks/search/actions';

import { FriendsSearchResult } from './FriendsSearchResult';
import { FriendsSearchInput } from './FriendsSearchInput';

const FriendsSearch: React.FC = () => {
    const dispatch = useDispatch();

    const handleSearch = (username: string) => {
        dispatch(searchUsersRequest(username))
    }

    return (
        <div>
            <FriendsSearchInput onSearch={handleSearch} />
            <FriendsSearchResult />
        </div>
    );
}

export { FriendsSearch }
