import React from 'react';

import { Input } from '_components/form/Input';
import { useForm } from '_helpers/useForm';

export interface IFriendsSearchInputProps {
    onSearch: (username: string) => void;
}

export interface IUserSearchData {
    username: string;
}

const defaultState: IUserSearchData = {
    username: ''
}

const FriendsSearchInput: React.FC<IFriendsSearchInputProps> = ({
    onSearch
}) => {
    const { data, onInputChange } = useForm<IUserSearchData>({
        initialData: defaultState
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSearch(data.username);
    }

    return (
        <form className="flex items-center flex-nowrap" onSubmit={handleSubmit}>
            <Input name="username" onChange={onInputChange} className="rounded-r-none" placeholder="Search for user..." />
            <button type="submit" className="bg-blue-500 border-none outline-none rounded-r-lg h-10 w-10 hover:bg-blue-400 flex items-center justify-center">

            </button>
        </form>
    );
}

export { FriendsSearchInput }