import { createAction } from '@reduxjs/toolkit';
import { TypesLoginDTO, TypesRegisterDTO } from '_services/types';
import { IAuthUser } from './reducer';

// Action - Register
export const registerRequest = createAction<TypesRegisterDTO>('auth:register:request');
export const registerSuccess = createAction<IAuthUser>('auth:register:success');
export const registerError = createAction<string[]>('auth:register:error');

// Action - Login
export const loginRequest = createAction<TypesLoginDTO>('auth:login:request');
export const loginSuccess = createAction<IAuthUser>('auth:login:success');
export const loginError = createAction<string[]>('auth:login:error');

// Action - Logout
export const logoutRequest = createAction('auth:logout:request');
export const logoutSuccess = createAction('auth:logout:success');

// Action - Get Profile
export const getProfileRequest = createAction('auth:getProfile:request');
export const getProfileSuccess = createAction<IAuthUser>('auth:getProfile:success');
export const getProfileError = createAction<string[]>('auth:getProfile:error');

// Action - Clear Errors
export const clearErrors = createAction('auth:clearErrors');