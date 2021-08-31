import { createAction } from '@reduxjs/toolkit';

// Action - Get Conversation Messages
export const getConversationMessagesRequest = createAction<number>('messages:getConversationMessages:request');
export const getConversationMessagesSuccess = createAction<string[]>('messages:getConversationMessages:success');
export const getConversationMessagesError = createAction<string[]>('messages:getConversationMessages:error');