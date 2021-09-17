import React from 'react';
import classNames from 'classnames';
import { IoSearch, IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';

import { useForm } from '_helpers/useForm';
import { searchUsersRequest, setSearchResults } from '_store/ducks/search/actions';

export interface ISearchInputProps {
    onSearchToggle: (value: boolean) => void;
}

interface ISearchData {
    value: string;
}

const defaultState: ISearchData = {
    value: ''
}

const SearchInput: React.FC<ISearchInputProps> = ({
    onSearchToggle
}) => {
    const dispatch = useDispatch();

    const { data, onInputChange, onInputValueSet } = useForm<ISearchData>({
        initialData: defaultState
    });

    // Handlers
    const handleInputClear = () => {
        onInputValueSet('value', '');
        onSearchToggle(false);

        dispatch(setSearchResults([]));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSearchToggle(true);
        dispatch(searchUsersRequest(data.value));
    }    

    // Styles
    const _inputStyles = classNames({
        'h-full w-full bg-white rounded-md px-2.5 text-xs font-semibold outline-none': true,
        'rounded-r-none pr-8': !!data.value.length
    })


    return (
        <form className="h-8 w-full flex flex-nowrap relative" onSubmit={handleSubmit}>
            <input className={_inputStyles} placeholder="Search Users..." onChange={onInputChange} name="value" value={data.value} />
            {
                !!data.value.length && (
                    <button type="button" className="h-8 w-8 bg-none flex items-center justify-center absolute right-8" onClick={handleInputClear}>
                        <IoClose className="h-4 text-custom-gray-dark" />
                    </button>
                )
            }
            {
                !!data.value.length && (
                    <button type="submit" className="h-8 w-8 bg-purple-500 flex items-center justify-center rounded-r-md flex-shrink-0">
                        <IoSearch className="h-4 text-white" />
                    </button>
                )
            }
        </form>
    )
}

export { SearchInput }