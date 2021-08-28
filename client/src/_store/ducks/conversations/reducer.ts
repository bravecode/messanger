import { createReducer } from "@reduxjs/toolkit"
import { getConversationsError, getConversationsRequest, getConversationsSuccess, openConversationError, openConversationRequest, openConversationSuccess } from "./actions"

export interface IConversationsState {
    conversations: IConversation[];
    pending: boolean;
    errors?: string[];
}

export interface IConversation {
    relationID: number;
    messages: string[];
}

const defaultState: IConversationsState = {
    conversations: [],
    pending: false,
    errors: undefined
}

export default createReducer(defaultState, (builder) => {
    builder
        .addCase(getConversationsRequest, (state) => {
            state.pending = false;
            state.errors = undefined;
        })
        .addCase(getConversationsSuccess, (state, { payload }) => {
            state.conversations = payload;
            state.pending = false;
            state.errors = undefined;
        })
        .addCase(getConversationsError, (state, { payload }) => {
            state.conversations = [];
            state.pending = false;
            state.errors = payload;
        })
        .addCase(openConversationRequest, (state) => {
            state.pending = true;
            state.errors = undefined;
        })
        .addCase(openConversationSuccess, (state, { payload }) => {
            state.pending = false;
        })
        .addCase(openConversationError, (state, { payload }) => {
            state.pending = false;
            state.errors = payload;
        })
        .addDefaultCase(() => {})
})