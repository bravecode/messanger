import { AxiosError, AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Action } from '@reduxjs/toolkit';

import { acceptError, acceptRequest, acceptSuccess, declineError, declineRequest, declineSuccess, getRelationshipsError, getRelationshipsRequest, getRelationshipsSuccess, inviteError, inviteRequest, inviteSuccess } from "./actions";

import { accept, decline, getRelationships, invite } from "_services/relationship.service";
import { TypesErrorResponse, TypesRelationshipResponse } from "_services/types";
import { IRelationship } from "./reducer";

// Workers
function* handleGetRelationshipsRequest(): SagaIterator {
    try {
        const { data }: AxiosResponse<TypesRelationshipResponse> = yield call(getRelationships);

        // Format Data
        const friends: IRelationship[] = data.friends.map((r): IRelationship => {
            return {
                ID: r.id,
                userID: r.user_id,
                online: r.online ?? false,
                userName: r.username,
                lastMessage: r.last_message ?? ''
            }
        });

        const incomingRequests: IRelationship[] = data.incoming_requests.map((r): IRelationship => {
            return {
                ID: r.id,
                userID: r.user_id,
                online: r.online ?? false,
                userName: r.username
            }
        });

        const outgoingRequests: IRelationship[] = data.outgoing_requests.map((r): IRelationship => {
            return {
                ID: r.id,
                userID: r.user_id,
                online: r.online ?? false,
                userName: r.username
            }
        });
        
        yield put(getRelationshipsSuccess({
            friends,
            incomingRequests,
            outgoingRequests,
        }));
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;
        
        if (typed.response?.data.errors) {
            yield put(getRelationshipsError(typed.response.data.errors))  
        } else {
            yield put(getRelationshipsError(['Unknown error has occured.']))  
        }   
    }
}

function* handleInviteRequest(action: Action): SagaIterator {
    try {
        if (inviteRequest.match(action)) {
            const userID = action.payload;

            yield call(invite, userID);
            yield put(inviteSuccess())
        }
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;
        
        if (typed.response?.data.errors) {
            yield put(inviteError(typed.response.data.errors))  
        } else {
            yield put(inviteError(['Unknown error has occured.']))  
        }
    }
}

function* handleAcceptRequest(action: Action): SagaIterator {
    try {
        if (acceptRequest.match(action)) {
            const requestID = action.payload;

            yield call(accept, requestID);
            yield put(acceptSuccess())
        }
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;
        
        if (typed.response?.data.errors) {
            yield put(acceptError(typed.response.data.errors))  
        } else {
            yield put(acceptError(['Unknown error has occured.']))  
        }
    }
}

function* handleDeclineRequest(action: Action): SagaIterator {
    try {
        if (declineRequest.match(action)) {
            const requestID = action.payload;

            yield call(decline, requestID);
            yield put(declineSuccess())
        }
    } catch (err) {
        const typed: AxiosError<TypesErrorResponse> = err;
        
        if (typed.response?.data.errors) {
            yield put(declineError(typed.response.data.errors))  
        } else {
            yield put(declineError(['Unknown error has occured.']))  
        }
    }
}

// Watchers
function* watchGetRelationshipsRequest() {
    yield takeEvery(getRelationshipsRequest, handleGetRelationshipsRequest);
}

function* watchInviteRequest() {
    yield takeEvery(inviteRequest, handleInviteRequest)
}

function* watchAcceptRequest() {
    yield takeEvery(acceptRequest, handleAcceptRequest)
}

function* watchDeclineRequest() {
    yield takeEvery(declineRequest, handleDeclineRequest)
}

export default function* relationshipSaga() {
    yield all([
        fork(watchGetRelationshipsRequest),
        fork(watchInviteRequest),
        fork(watchAcceptRequest),
        fork(watchDeclineRequest),
    ]);
}