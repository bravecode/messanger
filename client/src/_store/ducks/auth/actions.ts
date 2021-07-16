import { createAction } from '@reduxjs/toolkit';
import { TypesRegisterDTO } from '_services/types';
import { IAuthUser } from './reducer';

// Action - Register
export const registerRequest = createAction<TypesRegisterDTO>('auth:register:request');
export const registerSuccess = createAction<IAuthUser>('auth:register:success');
export const registerError = createAction<string[]>('auth:register:error');

// Action - Login
