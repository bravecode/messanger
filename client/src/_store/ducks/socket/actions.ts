import { createAction } from '@reduxjs/toolkit';

// Action - Connect
export const connectRequest = createAction('socket:connect:request');
export const connectSuccess = createAction('socket:connect:success');
export const connectError = createAction('socket:connect:error');

// Action - Disconnect
export const disconnectRequest = createAction('socket:disconnect:request');
export const disconnectSuccess = createAction('socket:disconnect:success');