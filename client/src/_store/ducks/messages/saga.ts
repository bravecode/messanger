import { Action } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getConversationMessages } from "_services/conversations.service";
import { TypesConversationMessage, TypesErrorResponse } from "_services/types";
import { getConversationMessagesError, getConversationMessagesRequest, getConversationMessagesSuccess } from "./actions";
import { IMessageGroup } from "./reducer";

// Workers
function* handleGetConversationMessagesRequest(action: Action): SagaIterator {
    try {
        if (getConversationMessagesRequest.match(action)) {
            const conversationID = action.payload;

            const result: AxiosResponse<TypesConversationMessage[]> = yield call(getConversationMessages, conversationID);

            const data: IMessageGroup[] = result.data.reduce((prev, current, i): IMessageGroup[] => {
                if (prev.length === 0) {
                    return [
                        {
                            isAuthor: current.author,
                            authorName: current.author ? 'Chris' : 'Other User',
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
                        authorName: current.author ? 'Chris' : 'Other User',
                        messages: [current.content]
                    }
                ];
            }, [] as IMessageGroup[])

            yield put(getConversationMessagesSuccess(data))
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