import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { logoutSuccess } from '../auth/actions';
import { acceptError, declineError, getRelationshipsError, getRelationshipsRequest, getRelationshipsSuccess, inviteError, updateUserStatus } from './actions';

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
    lastMessage?: string;
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
        .addCase(updateUserStatus, (state, { payload }) => {
            state.friends = state.friends.map((friend) => {
                if (friend.userID === payload.userID) {
                    return {
                        ...friend,
                        online: payload.online
                    }
                }

                return friend;
            })
        })
        .addCase(getRelationshipsRequest, (state) => {
            state.pending = true;
        })
        .addCase(getRelationshipsSuccess, (state, { payload }) => {
            state.pending = false;
            state.friends = payload.friends;
            state.incomingRequests = payload.incomingRequests;
            state.outgoingRequests = payload.outgoingRequests;
        })
        .addCase(logoutSuccess, () => {
            return defaultState;
        })
        .addMatcher(isAnyOf(getRelationshipsError, inviteError, acceptError, declineError), (state, { payload }) => {
            state.pending = false;
            state.errors = payload;
        })
        .addDefaultCase(() => {})
});