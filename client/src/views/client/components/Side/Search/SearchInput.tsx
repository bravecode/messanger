import React from 'react';
import classNames from 'classnames';
import { IoSearch, IoClose } from "react-icons/io5";

import { useForm } from '_helpers/useForm';

interface ISearchData {
    value: string;
}

const defaultState: ISearchData = {
    value: ''
}

const SearchInput: React.FC = () => {
    const { data, onInputChange, onInputValueSet } = useForm<ISearchData>({
        initialData: defaultState
    });

    // Handlers
    const handleInputClear = () => {
        onInputValueSet('value', '');
    }

    // Styles
    const _inputStyles = classNames({
        'h-full w-full bg-white rounded-md px-2.5 text-xs font-semibold outline-none': true,
        'rounded-r-none pr-8': !!data.value.length
    })


    return (
        <div className="h-8 w-full flex flex-nowrap relative">
            <input className={_inputStyles} placeholder="Search Users..." onChange={onInputChange} name="value" value={data.value} />
            {
                !!data.value.length && (
                    <button className="h-8 w-8 bg-none flex items-center justify-center absolute right-8" onClick={handleInputClear}>
                        <IoClose className="h-4 text-custom-gray-dark" />
                    </button>
                )
            }
            {
                !!data.value.length && (
                    <button className="h-8 w-8 bg-purple-500 flex items-center justify-center rounded-r-md flex-shrink-0">
                        <IoSearch className="h-4 text-white" />
                    </button>
                )
            }
        </div>
    )
}

export { SearchInput }