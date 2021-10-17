import { Action } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { getConversationMessages } from "_services/conversations.service";
import { TypesConversationMessages, TypesErrorResponse } from "_services/types";
import { startGame, updateGameScore } from "../game/actions";
import { getConversationMessagesError, getConversationMessagesRequest, getConversationMessagesSuccess, refetchConversationMessagesRequest } from "./actions";
import { IMessageGroup } from "./reducer";

// Workers
function* handleGetConversationMessagesRequest(action: Action): SagaIterator {
    try {
        if (getConversationMessagesRequest.match(action) || refetchConversationMessagesRequest.match(action)) {
            const conversationID = action.payload;

            const result: AxiosResponse<TypesConversationMessages> = yield call(getConversationMessages, conversationID);

            const data: IMessageGroup[] = result.data.messages.reduce((prev, current): IMessageGroup[] => {
                if (current.system_message) {
                    return [
                        ...prev,
                        {
                            type: 'system',
                            isAuthor: false,
                            messages: [current.content]
                        }
                    ];
                }
                
                if (prev.length === 0 || prev[prev.length - 1].type === 'system') {
                    return [
                        ...prev,
                        {
                            type: 'user',
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
                        type: 'user',
                        isAuthor: current.author,
                        messages: [current.content]
                    }
                ];
            }, [] as IMessageGroup[])

            // Set Messages
            yield put(getConversationMessagesSuccess(data));

            // Set Game Score
            yield put(updateGameScore(result.data.score));

            // Show 'Your Turn' Alert
            if (result.data.your_turn) {
                yield put(startGame());
            }
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

function* watchRefetchConversationMessagesRequest() {
    yield takeLatest(refetchConversationMessagesRequest, handleGetConversationMessagesRequest);
}

export default function* messagesSaga() {
    yield all([
        fork(watchGetConversationMessagesRequest),
        fork(watchRefetchConversationMessagesRequest)
    ]);
}