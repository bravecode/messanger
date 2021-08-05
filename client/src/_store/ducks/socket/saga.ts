import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { connect } from '_services/socket.service';
import { connectError, connectRequest, connectSuccess } from "./actions";

// Workers
function *handleConnectRequest(): SagaIterator {
    try {
        yield call(connect);
        yield put(connectSuccess());
    } catch (err) {
        console.log(err);
        yield put(connectError());  
    }
}

// Watchers
export function *watchConnectRequest() {
    yield takeLatest(connectRequest, handleConnectRequest);
}

export default function* socketSaga() {
    yield all([
        fork(watchConnectRequest)
    ])
}