import { createReducer } from '@reduxjs/toolkit';
import {
    registerRequest,
    registerError,
    registerSuccess,
} from './actions';

export interface IAuthState {
    readonly user?: IAuthUser;
    readonly errors?: string[];
    readonly pending: boolean;
}

export interface IAuthUser {
    ID: number;
    username: string;
    email: string;
}

const defaultState: IAuthState = {
    user: undefined,
    errors: undefined,
    pending: false
}

export default createReducer(defaultState, (builder) => {
    builder
        .addCase(registerRequest, (state) => {
            state.pending = true;
        })
        .addCase(registerError, (state, action) => {
            const { payload } = action;

            state.errors = payload;
            state.pending = false;
        })
        .addCase(registerSuccess, (state, action) => {
            const { payload } = action;

            state.user = payload;
            state.pending = false;
        })
        .addDefaultCase(() => {});
});
