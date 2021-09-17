import { createAction } from "@reduxjs/toolkit";
import { ISearchUser } from "./reducer";

// Action - Search Users
export const searchUsersRequest = createAction<string>('search:searchUsers:request');
export const searchUsersSuccess = createAction<ISearchUser[]>('search:searchUsers:success');
export const searchUsersError = createAction<string[]>('search:searchUsers:error');

// Action - Set Search Results
export const setSearchResults = createAction<ISearchUser[]>('search:setResults');