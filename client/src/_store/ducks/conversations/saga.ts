import { Action } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { getConversations, openConversation } from '_services/conversations.service';
import { TypesConversation, TypesErrorResponse } from '_services/types';

import { getConversationsError, getConversationsRequest, getConversationsSuccess, openConversationError, openConversationRequest } from './actions';
import { IConversation } from './reducer';

// Workers
function* handleOpenConversationRequest(action: Action): SagaIterator {
    try {
        if (openConversationRequest.match(action)) {
            const relationshipID = action.payload;

            yield call(openConversation, relationshipID);
        }
    } catch (e) {
        yield put(openConversationError(['Unknown error has occured.']))  
    }
}

function* handleGetConversationsRequest(): SagaIterator {
    try {
        const result: AxiosResponse<TypesConversation[]> = yield call(getConversations);

        yield put(getConversationsSuccess(
            result.data.map((conversation): IConversation => {
                return {
                    relationID: conversation.relationship_id,
                    lastMessage: conversation.last_message || 'Say hello to your friend.'
                }
            })
        ))
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;
        
        if (typed.response?.data.errors) {
            yield put(getConversationsError(typed.response.data.errors))  
        } else {
            yield put(getConversationsError(['Unknown error has occured.']))  
        }
    } 
}

// Watchers
function* watchOpenConversationRequest() {
    yield takeEvery(openConversationRequest, handleOpenConversationRequest);
}

function* watchGetConversationsRequest() {
    yield takeLatest(getConversationsRequest, handleGetConversationsRequest);
}

export default function* conversationsSaga() {
    yield all([
        fork(watchOpenConversationRequest),
        fork(watchGetConversationsRequest),
    ]);
}