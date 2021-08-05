import { all, fork } from "redux-saga/effects";

import authSaga from "./auth/saga";
import socketSaga from "./socket/saga";

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(socketSaga),
    ]);
}