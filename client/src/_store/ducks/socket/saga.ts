import { Action } from '@reduxjs/toolkit';
import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { connectError, connectRequest, connectSuccess } from "./actions";

import { connect } from '_services/socket.service';

// Workers
function *handleConnectRequest(action: Action): SagaIterator {
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

// Watchers
export function *watchConnectRequest() {
    yield takeLatest(connectRequest, handleConnectRequest);
}

export default function* socketSaga() {
    yield all([
        fork(watchConnectRequest)
    ]);
}