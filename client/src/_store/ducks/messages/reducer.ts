import { createReducer } from '@reduxjs/toolkit';
import { logoutSuccess } from '../auth/actions';
import { getConversationMessagesError, getConversationMessagesRequest, getConversationMessagesSuccess, refetchConversationMessagesError, refetchConversationMessagesRequest, refetchConversationMessagesSuccess } from './actions';

export interface IMessagesState {
    activeConversationID?: number;
    groups: IMessageGroup[];
    pending: boolean;
    errors?: string[];
}

export interface IMessageGroup {
    type: 'user' | 'system';
    isAuthor: boolean;
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
        .addCase(refetchConversationMessagesRequest, (state, { payload }) => {
            state.activeConversationID = payload;
            state.pending = false;
        })
        .addCase(refetchConversationMessagesSuccess, (state, { payload }) => {
            state.groups = payload;
            state.pending = false;
        })
        .addCase(refetchConversationMessagesError, (state, { payload }) => {
            state.errors = payload;
            state.pending = false;
        })
        .addCase(logoutSuccess, () => {
            return defaultState;
        })
        .addDefaultCase(() => {})
});
