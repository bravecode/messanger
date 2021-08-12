import { createReducer } from '@reduxjs/toolkit';
import { getRelationshipsError, getRelationshipsRequest, getRelationshipsSuccess } from './actions';

export interface IRelationshipState extends IRelationshipsGrouped {
    pending: boolean;
    errors?: string[];
}

export interface IRelationshipsGrouped {
    friends: IRelationship[];
    incomingRequests: IRelationship[];
    outgoingRequests: IRelationship[];
}

export interface IRelationship {
    ID: number;
    userID: number;
    userName: string;
    online: boolean;
}

const defaultState: IRelationshipState = {
    friends: [],
    incomingRequests: [],
    outgoingRequests: [],
    pending: false,
    errors: undefined
}

export default createReducer(defaultState, (builder) => {
    builder
        .addCase(getRelationshipsRequest, (state) => {
            state.pending = true;
        })
        .addCase(getRelationshipsSuccess, (state, { payload }) => {
            state.pending = false;
            state.friends = payload.friends;
            state.incomingRequests = payload.incomingRequests;
            state.outgoingRequests = payload.outgoingRequests;
        })
        .addCase(getRelationshipsError, (state, { payload }) => {
            state.pending = false;
            state.errors = payload;
        })
        .addDefaultCase(() => {})
});