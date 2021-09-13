import React from 'react';
import { IoAdd } from 'react-icons/io5';

export interface ISearchResultsItemProps {
    userName: string;
}

const SearchResultsItem: React.FC<ISearchResultsItemProps> = ({
    userName
}) => {
    return (
        <div className="flex items-center gap-2.5 text-sm relative group">
            
            <div className="h-8 w-8 rounded-full bg-custom-backgorund flex items-center justify-center text-white font-semibold">
                { userName[0] }
            </div>

            <div className="text-black">
                { userName }
            </div>

            <div className="absolute right-0 top-0 h-full flex items-center gap-1 opacity-0 group-hover:opacity-100">
                <button className="h-5 w-5 flex items-center justify-center rounded-md bg-purple-500 hover:bg-purple-600 text-white">
                    <IoAdd color="inherit" size="14px" />
                </button>
            </div>

        </div>
    );
}

export { SearchResultsItem }
