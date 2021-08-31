import { createReducer } from '@reduxjs/toolkit';
import { getConversationMessagesError, getConversationMessagesRequest, getConversationMessagesSuccess } from './actions';

export interface IMessagesState {
    activeConversationID?: number;
    messages: string[];
    pending: boolean;
    errors?: string[];
}

const defaultState: IMessagesState = {
    activeConversationID: undefined,
    messages: [],
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
            state.messages = payload;
            state.pending = false;
        })
        .addCase(getConversationMessagesError, (state, { payload }) => {
            state.errors = payload;
            state.pending = false;
        })
        .addDefaultCase(() => {})
});