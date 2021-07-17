import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { login, register } from '_services/auth.service';
import { AxiosError, AxiosResponse } from 'axios';
import { TypesAuthResponse, TypesErrorResponse } from '_services/types';
import { loginRequest, logoutRequest, logoutSuccess, registerError, registerRequest, registerSuccess } from './actions';
import { SagaIterator } from 'redux-saga';

// Workers
function* handleRegisterRequest({ payload }: any): SagaIterator {
    try {
        const { username, email, password } = payload;
        
        const response: AxiosResponse<TypesAuthResponse> = yield call(register, username, email, password);
        
        // Store access token
        localStorage.setItem('token', response.data.auth.token);

        // Store user data
        yield put(registerSuccess({
            ID: response.data.user.id,
            email: response.data.user.email,
            username: response.data.user.username,
        }));
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;
        
        if (typed.response?.data.errors) {
            yield put(registerError(typed.response.data.errors))  
        } else {
            yield put(registerError(['Unknown error has occured.']))  
        }
    }
}

function* handleLoginRequest({ payload }: any): SagaIterator {
    try {
        const { email, password } = payload;
        
        const response: AxiosResponse<TypesAuthResponse> = yield call(login, email, password);
        
        // Store access token
        localStorage.setItem('token', response.data.auth.token);

        // Store user data
        yield put(registerSuccess({
            ID: response.data.user.id,
            email: response.data.user.email,
            username: response.data.user.username,
        }));
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;
        
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

export function* watchLogoutRequest() {
    yield takeEvery(logoutRequest, handleLogoutRequest);
}

export default function* authSaga() {
    yield all([
        fork(watchRegisterRequest),
        fork(watchLoginRequest),
        fork(watchLogoutRequest),
    ])
}