import { Action } from '@reduxjs/toolkit';
import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { connectError, connectRequest, connectSuccess, disconnectRequest, disconnectSuccess } from "./actions";

import { connect, disconnect } from '_services/socket.service';

// Workers
function* handleConnectRequest(action: Action): SagaIterator {
    try {
        if (connectRequest.match(action)) {
            const userID = action.payload;
        
            const socket: WebSocket = yield call(connect, userID);

            yield put(connectSuccess(socket));
        }
    } catch (err) {
        yield put(connectError());  
    }
}

function* handleDisconnectRequest(): SagaIterator {
    yield call(disconnect);
    yield put(disconnectSuccess())
}

// Watchers
export function* watchConnectRequest() {
    yield takeEvery(connectRequest, handleConnectRequest);
}

export function* watchDisconnectRequest() {
    yield takeEvery(disconnectRequest, handleDisconnectRequest);
}

export default function* socketSaga() {
    yield all([
        fork(watchConnectRequest),
        fork(watchDisconnectRequest)
    ]);
}