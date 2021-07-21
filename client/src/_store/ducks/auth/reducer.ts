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
    getProfileRequest,
    getProfileError,
    getProfileSuccess,
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
        .addMatcher(isAnyOf(registerRequest, loginRequest, getProfileRequest), (state) => {
            state.pending = true;
        })
        .addMatcher(isAnyOf(registerError, loginError, getProfileError), (state, action) => {
            const { payload } = action;

            state.pending = false;
            state.errors = payload;
        })
        .addMatcher(isAnyOf(registerSuccess, loginSuccess, getProfileSuccess), (state, action) => {
            const { payload } = action;

            state.pending = false;
            state.user = payload;
        })
        .addDefaultCase(() => {});
});
