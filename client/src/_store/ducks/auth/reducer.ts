import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import {
    registerRequest,
    registerError,
    registerSuccess,
    loginRequest,
    loginError,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    clearErrors,
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
        .addCase(logoutRequest, (state) => {
            state.pending = true;
        })
        .addCase(logoutSuccess, (state) => {
            state = defaultState;
        })
        .addCase(clearErrors, (state) => {
            state.errors = undefined;
        })
        .addMatcher(isAnyOf(registerRequest, loginRequest), (state) => {
            state.pending = true;
        })
        .addMatcher(isAnyOf(registerError, loginError), (state, action) => {
            const { payload } = action;

            state.errors = payload;
            state.pending = false;
        })
        .addMatcher(isAnyOf(registerSuccess, loginSuccess), (state, action) => {
            const { payload } = action;

            state.user = payload;
            state.pending = false;
        })
        .addDefaultCase(() => {});
});
