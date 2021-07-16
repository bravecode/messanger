import { call, put, all, takeLatest } from 'redux-saga/effects';
import { register } from '_services/auth.service';
import { AxiosError, AxiosResponse } from 'axios';
import { TypesAuthResponse, TypesErrorResponse, TypesRegisterDTO } from '_services/types';
import { registerRequest, registerSuccess } from './actions';
import { IAuthUser } from './reducer';
import { SagaIterator } from 'redux-saga';

// eslint-disable-next-line require-yield
function* handleRegisterRequest({ payload }: any): SagaIterator {
    try {
        const { username, email, password } = payload;
        
        const response: AxiosResponse<TypesAuthResponse> = yield call(register, username, email, password);
        
        put(registerSuccess({
            ID: response.data.user.id,
            email: response.data.user.email,
            username: response.data.user.username,
        }));

    } catch (err) {
        console.log('error!!!');
        console.log(err);
    }
}

export default function* authSaga() {
    yield takeLatest(registerRequest, handleRegisterRequest)
}