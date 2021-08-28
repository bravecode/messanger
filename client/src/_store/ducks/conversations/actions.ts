import { createAction } from '@reduxjs/toolkit';
import { TypesSocketResponse } from '_services/types';
import { IConversation } from './reducer';

// Action - Get Covnersations
export const getConversationsRequest = createAction('conversations:getConversations:request');
export const getConversationsSuccess = createAction<IConversation[]>('conversations:getConversations:success');
export const getConversationsError = createAction<string[]>('conversations:getConversations:error');

// Action - Open Conversation
export const openConversationRequest = createAction<number>('conversations:open:request');
export const openConversationSuccess = createAction<TypesSocketResponse>('conversations:open:success');
export const openConversationError = createAction<string[]>('conversations:open:error');

// Action - Send Message
export const sendMessageRequest = createAction('conversations:sendMessage:request');
export const sendMessageSuccess = createAction('conversations:sendMessage:success');
export const sendMessageError = createAction('conversations:sendMessage:error');