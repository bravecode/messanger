import React from 'react';

// Components
import { Profile } from './Profile/Profile';
import { Requests } from './Requests/Requests';
import { Search } from './Search/Search';
import { Friends } from './Friends/Friends';

const Side: React.FC = () => {
    return (
        <div className="w-64 h-full py-5 bg-custom-gray-lightest flex-shrink-0 relative border-r border-custom-gray-light">

            <Profile />

            <Search />

            <Friends />

            <Requests />

        </div>
    );
}

export { Side }