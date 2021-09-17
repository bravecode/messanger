import React from 'react';
import { IoAdd } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

import { inviteRequest } from '_store/ducks/relationship/actions';
import { IRelationship } from '_store/ducks/relationship/reducer';

export interface ISearchResultsItemProps {
    userID: number;
    userName: string;
    requests: IRelationship[];
}

const SearchResultsItem: React.FC<ISearchResultsItemProps> = ({
    userID,
    userName,
    requests
}) => {
    const dispatch = useDispatch();

    // Handlers
    const handleInvite = () => {
        dispatch(inviteRequest(userID))
    }

    // Disable when user is already in relation
    const enabled = !requests.find((user) => user.userID === userID);

    return (
        <div className="flex items-center gap-2.5 text-sm relative group">
            
            <div className="h-8 w-8 rounded-full bg-custom-backgorund flex items-center justify-center text-white font-semibold">
                { userName[0] }
            </div>

            <div className="text-black">
                { userName }
            </div>

            {
                enabled && (
                    <div className="absolute right-0 top-0 h-full flex items-center gap-1 opacity-0 group-hover:opacity-100">
                        <button className="h-5 w-5 flex items-center justify-center rounded-md bg-purple-500 hover:bg-purple-600 text-white" onClick={handleInvite}>
                            <IoAdd color="inherit" size="14px" />
                        </button>
                    </div>
                )
            }

        </div>
    );
}

export { SearchResultsItem }
