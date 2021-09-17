import React from 'react';

// Components
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';

export interface ISearchProps {
    onSearchToggle: (value: boolean) => void;
}

const Search: React.FC<ISearchProps> = ({
    onSearchToggle
}) => {
    return (
        <div className="w-full mt-5 px-5">
            
            <SearchInput onSearchToggle={onSearchToggle} />

            <SearchResults />

        </div>
    );
}

export { Search }