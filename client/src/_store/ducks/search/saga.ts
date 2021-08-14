import { Action } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { searchUsers } from "_services/search.service";
import { TypesErrorResponse, TypesUserSearchResponse } from "_services/types";
import { searchUsersError, searchUsersRequest, searchUsersSuccess } from "./actions";

// Workers
function* handleSearchUsers(action: Action): SagaIterator {
    try {
        if (searchUsersRequest.match(action)) {
            const username = action.payload;

            const response: AxiosResponse<TypesUserSearchResponse[]> = yield call(searchUsers, username);

            // Store Results
            yield put(searchUsersSuccess(
                response.data.map((user) => {
                    return {
                        ID: user.id,
                        username: user.username
                    }
                })
            ))
        }
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;
        
        if (typed.response?.data.errors) {
            yield put(searchUsersError(typed.response.data.errors))  
        } else {
            yield put(searchUsersError(['Unknown error has occured.']))  
        }
    }
}

// Watchers
export function* watchSearchUsersRequest() {
    yield takeLatest(searchUsersRequest, handleSearchUsers);
}

export default function* searchSaga() {
    yield all([
        fork(watchSearchUsersRequest),
    ])
}