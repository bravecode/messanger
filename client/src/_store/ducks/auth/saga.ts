import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getProfile, login, register } from '_services/auth.service';
import { AxiosError, AxiosResponse } from 'axios';
import { TypesAuthResponse, TypesErrorResponse, TypesUserResponse } from '_services/types';
import { getProfileRequest, getProfileSuccess, loginRequest, logoutRequest, logoutSuccess, registerError, registerRequest, registerSuccess } from './actions';
import { SagaIterator } from 'redux-saga';
import { Action } from '@reduxjs/toolkit';

// Note: Maybe a helper guard util that will automatically check if our action type is correct
// in order to access payload without TS warnings / errors?
// Workers
function* handleRegisterRequest(action: Action): SagaIterator {
    try {
        if (registerRequest.match(action)) {
            const { username, email, password } = action.payload;
        
            const response: AxiosResponse<TypesAuthResponse> = yield call(register, username, email, password);
            
            // Store access token
            localStorage.setItem('token', response.data.auth.token);

            // Store user data
            yield put(registerSuccess({
                ID: response.data.user.id,
                email: response.data.user.email,
                username: response.data.user.username,
            }));
        }
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;
        
        if (typed.response?.data.errors) {
            yield put(registerError(typed.response.data.errors))  
        } else {
            yield put(registerError(['Unknown error has occured.']))  
        }
    }
}

function* handleLoginRequest(action: Action): SagaIterator {
    try {
        if (loginRequest.match(action)) {
            const { email, password } = action.payload;
        
            const response: AxiosResponse<TypesAuthResponse> = yield call(login, email, password);
            
            // Store access token
            localStorage.setItem('token', response.data.auth.token);

            // Store user data
            yield put(registerSuccess({
                ID: response.data.user.id,
                email: response.data.user.email,
                username: response.data.user.username,
            }));
        }
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;
        
        if (typed.response?.data.errors) {
            yield put(registerError(typed.response.data.errors))  
        } else {
            yield put(registerError(['Unknown error has occured.']))  
        }
    }
}

function* handleGetProfileRequest(): SagaIterator {
    try {
        const response: AxiosResponse<TypesUserResponse> = yield call(getProfile);

        // Store user data
        yield put(getProfileSuccess({
            ID: response.data.id,
            email: response.data.email,
            username: response.data.username,
        }));
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;

        // Clear token to prevent bad requests
        localStorage.removeItem('token');
        
        if (typed.response?.data.errors) {
            yield put(registerError(typed.response.data.errors))  
        } else {
            yield put(registerError(['Unknown error has occured.']))  
        }
    }
}

function* handleLogoutRequest(): SagaIterator {
    // Remove access token
    localStorage.removeItem('token');

    // & restore store to default state
    yield put(logoutSuccess);
}

// Watchers
export function* watchRegisterRequest() {
    yield takeEvery(registerRequest, handleRegisterRequest);
}

export function* watchLoginRequest() {
    yield takeEvery(loginRequest, handleLoginRequest);
}

export function* watchGetProfileRequest() {
    yield takeEvery(getProfileRequest, handleGetProfileRequest);
}

export function* watchLogoutRequest() {
    yield takeEvery(logoutRequest, handleLogoutRequest);
}

export default function* authSaga() {
    yield all([
        fork(watchRegisterRequest),
        fork(watchLoginRequest),
        fork(watchGetProfileRequest),
        fork(watchLogoutRequest),
    ])
}