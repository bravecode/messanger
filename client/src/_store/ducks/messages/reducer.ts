import { createReducer } from '@reduxjs/toolkit';
import { getConversationMessagesError, getConversationMessagesRequest, getConversationMessagesSuccess } from './actions';

export interface IMessagesState {
    activeConversationID?: number;
    groups: IMessageGroup[];
    pending: boolean;
    errors?: string[];
}

export interface IMessageGroup {
    isAuthor: boolean;
    authorName: string;
    messages: string[]
}

const defaultState: IMessagesState = {
    activeConversationID: undefined,
    groups: [],
    pending: false,
    errors: undefined
}

export default createReducer(defaultState, (builder) => {
    builder
        .addCase(getConversationMessagesRequest, (state, { payload }) => {
            state.activeConversationID = payload;
            state.pending = true;
        })
        .addCase(getConversationMessagesSuccess, (state, { payload }) => {
            state.groups = payload;
            state.pending = false;
        })
        .addCase(getConversationMessagesError, (state, { payload }) => {
            state.errors = payload;
            state.pending = false;
        })
        .addDefaultCase(() => {})
});