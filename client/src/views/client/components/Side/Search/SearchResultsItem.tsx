import React from 'react';

export interface ISearchResultsItemProps {
    userName: string;
}

const SearchResultsItem: React.FC<ISearchResultsItemProps> = ({
    userName
}) => {
    return (
        <div className="flex items-center gap-2.5 text-sm">
            
            <div className="h-8 w-8 rounded-full bg-custom-backgorund flex items-center justify-center text-white font-semibold">
                { userName[0] }
            </div>

            <div className="text-black">
                { userName }
            </div>

        </div>
    );
}

export { SearchResultsItem }
