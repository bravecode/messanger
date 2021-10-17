import { createReducer } from "@reduxjs/toolkit"
import { logoutSuccess } from "../auth/actions"
import { searchUsersError, searchUsersRequest, searchUsersSuccess, setSearchResults } from "./actions"

export interface ISearchState {
    users: ISearchUser[];
    pending: boolean;
    errors?: string[];
}

export interface ISearchUser {
    ID: number;
    username: string;
}

const defaultState: ISearchState = {
    users: [],
    pending: false,
    errors: undefined
}

export default createReducer(defaultState, (builder) => {
    builder
        .addCase(searchUsersRequest, (state) => {
            state.pending = true;
            state.users = []
        })
        .addCase(searchUsersError, (state, { payload }) => {
            state.pending = false;
            state.errors = payload;
        })
        .addCase(searchUsersSuccess, (state, { payload }) => {
            state.pending = false;
            state.users = payload;
        })
        .addCase(setSearchResults, (state, { payload }) => {
            state.users = payload;
            state.errors = undefined;
            state.pending = false;
        })
        .addCase(logoutSuccess, () => {
            return defaultState;
        })
        .addDefaultCase(() => {})
})