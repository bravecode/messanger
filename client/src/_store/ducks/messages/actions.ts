import { createAction } from '@reduxjs/toolkit';
import { IMessageGroup } from './reducer';

// Action - Get Conversation Messages
export const getConversationMessagesRequest = createAction<number>('messages:getConversationMessages:request');
export const getConversationMessagesSuccess = createAction<IMessageGroup[]>('messages:getConversationMessages:success');
export const getConversationMessagesError = createAction<string[]>('messages:getConversationMessages:error');