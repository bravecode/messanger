import { AxiosError, AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Action } from '@reduxjs/toolkit';

import { getRelationshipsError, getRelationshipsRequest, getRelationshipsSuccess, inviteError, inviteRequest, inviteSuccess } from "./actions";

import { getRelationships, invite } from "_services/relationship.service";
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
                userName: r.username
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

// Watchers
function* watchGetRelationshipsRequest() {
    yield takeEvery(getRelationshipsRequest, handleGetRelationshipsRequest);
}

function* watchInviteRequest() {
    yield takeEvery(inviteRequest, handleInviteRequest)
}

export default function* relationshipSaga() {
    yield all([
        fork(watchGetRelationshipsRequest),
        fork(watchInviteRequest),
    ]);
}