import { createAction } from '@reduxjs/toolkit';
import { IRelationshipsGrouped } from './reducer';

// Action - Get Relationships
export const getRelationshipsRequest = createAction('relationship:getRelationships:request');
export const getRelationshipsSuccess = createAction<IRelationshipsGrouped>('relationship:getRelationships:success');
export const getRelationshipsError = createAction<string[]>('relationship:getRelationships:error');

// Action - Send Invite Request
export const inviteRequest = createAction<number>('relationship:invite:request');
export const inviteSuccess = createAction('relationship:invite:success');
export const inviteError = createAction<string[]>('relationship:invite:error');

// Action - Accept Request
export const acceptRequest = createAction<number>('relationship:accept:request');
export const acceptSuccess = createAction('relationship:accept:success');
export const acceptError = createAction<string[]>('relationship:accept:error');

// Actiion - Decline Request
export const declineRequest = createAction<number>('relationship:decline:request');
export const declineSuccess = createAction('relationship:decline:success');
export const declineError = createAction<string[]>('relationship:decline:error');