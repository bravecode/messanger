import { call, put, takeLatest } from 'redux-saga/effects';
import { register } from '_services/auth.service';
import { AxiosError, AxiosResponse } from 'axios';
import { TypesAuthResponse, TypesErrorResponse } from '_services/types';
import { registerError, registerRequest, registerSuccess } from './actions';
import { SagaIterator } from 'redux-saga';

function* handleRegisterRequest({ payload }: any): SagaIterator {
    try {
        const { username, email, password } = payload;
        
        const response: AxiosResponse<TypesAuthResponse> = yield call(register, username, email, password);
        
        // Store access token
        localStorage.setItem('token', response.data.auth.token);

        // Store user data
        put(registerSuccess({
            ID: response.data.user.id,
            email: response.data.user.email,
            username: response.data.user.username,
        }));
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;
        
        if (typed.response?.data.errors) {
            put(registerError(typed.response.data.errors))  
        } else {
            put(registerError(['Unknown error has occured.']))  
        }
    }
}

export default function* authSaga() {
    yield takeLatest(registerRequest, handleRegisterRequest)
}