import React from 'react';

// Components
import { SearchResultsItem } from './SearchResultsItem';

const SearchResults: React.FC = () => {
    return (
        <div className="grid gap-2.5 py-5">
            
            <SearchResultsItem userName="Samantha Smith" />
            <SearchResultsItem userName="Jerry Smith" />
            <SearchResultsItem userName="Bosch" />

        </div>
    );
}

export { SearchResults }