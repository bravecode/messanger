import { Action } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getConversationMessages } from "_services/conversations.service";
import { TypesConversationMessages, TypesErrorResponse } from "_services/types";
import { updateGameScore } from "../game/actions";
import { getConversationMessagesError, getConversationMessagesRequest, getConversationMessagesSuccess } from "./actions";
import { IMessageGroup } from "./reducer";

// Workers
function* handleGetConversationMessagesRequest(action: Action): SagaIterator {
    try {
        if (getConversationMessagesRequest.match(action)) {
            const conversationID = action.payload;

            const result: AxiosResponse<TypesConversationMessages> = yield call(getConversationMessages, conversationID);

            const data: IMessageGroup[] = result.data.messages.reduce((prev, current, i): IMessageGroup[] => {
                if (prev.length === 0) {
                    return [
                        {
                            isAuthor: current.author,
                            messages: [current.content]
                        }
                    ]
                }                
                
                const restGroups = [...prev];
                restGroups.pop();

                const prevGroup = prev[prev.length - 1];

                if ((prevGroup.isAuthor && current.author) || (!prevGroup.isAuthor && !current.author)) {
                    prevGroup.messages.push(current.content);

                    return [
                        ...restGroups,
                        prevGroup
                    ]
                }

                return [
                    ...restGroups,
                    prevGroup,
                    {
                        isAuthor: current.author,
                        messages: [current.content]
                    }
                ];
            }, [] as IMessageGroup[])

            yield put(getConversationMessagesSuccess(data));
            yield put(updateGameScore(result.data.score));
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