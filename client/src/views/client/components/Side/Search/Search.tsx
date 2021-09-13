import React from 'react';

// Components
import { SearchInput } from './SearchInput';
//import { SearchResults } from './SearchResults';

const Search: React.FC = () => {
    
    return (
        <div className="w-full mt-5 px-5">
            
            <SearchInput />

        </div>
    );
}

export { Search }