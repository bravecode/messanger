import { Action } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getConversationMessages } from "_services/conversations.service";
import { TypesErrorResponse } from "_services/types";
import { getConversationMessagesError, getConversationMessagesRequest, getConversationMessagesSuccess } from "./actions";

// Workers
function* handleGetConversationMessagesRequest(action: Action): SagaIterator {
    try {
        if (getConversationMessagesRequest.match(action)) {
            const conversationID = action.payload;

            const result: AxiosResponse<string[]> = yield call(getConversationMessages, conversationID);
            put(getConversationMessagesSuccess(result.data))
        }
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;
        
        if (typed.response?.data.errors) {
            yield put(getConversationMessagesError(typed.response.data.errors))  
        } else {
            yield put(getConversationMessagesError(['Unknown error has occured.']))  
        }
    }
}

// Watchers
function* watchGetConversationMessagesRequest() {
    yield takeLatest(getConversationMessagesRequest, handleGetConversationMessagesRequest);
}

export default function* messagesSaga() {
    yield all([
        fork(watchGetConversationMessagesRequest),
    ]);
}