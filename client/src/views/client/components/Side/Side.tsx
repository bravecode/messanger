import React from 'react';

// Components
import { Profile } from './Profile/Profile';
import { Requests } from './Requests/Requests';
import { Search } from './Search/Search';

const Side: React.FC = () => {
    return (
        <div className="w-64 h-full p-5 bg-custom-gray-lightest flex-shrink-0 relative">

            <Profile />

            <Search />

            <Requests />

        </div>
    );
}

export { Side }