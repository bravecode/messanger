import { createAction } from '@reduxjs/toolkit';
import { IRelationshipsGrouped } from './reducer';

// Action - Get Relationships
export const getRelationshipsRequest = createAction('relationship:getRelationships:request');
export const getRelationshipsSuccess = createAction<IRelationshipsGrouped>('relationship:getRelationships:success');
export const getRelationshipsError = createAction<string[]>('relationship:getRelationships:error');

// Action - Send Friend Request

// Action - Accept Friend Request

// Actiion - Decline Friend Request