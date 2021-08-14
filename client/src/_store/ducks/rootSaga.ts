import { all, fork } from "redux-saga/effects";

import authSaga from "./auth/saga";
import relationshipSaga from "./relationship/saga";
import searchSaga from "./search/saga";
import socketSaga from "./socket/saga";

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(socketSaga),
        fork(relationshipSaga),
        fork(searchSaga),
    ]);
}