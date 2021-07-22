import { clearErrors, getProfileError, getProfileRequest, getProfileSuccess, loginError, loginRequest, loginSuccess, logoutRequest, logoutSuccess, registerError, registerRequest, registerSuccess } from '../actions';
import reducer, { IAuthState, IAuthUser } from '../reducer';

describe('Reducer - Auth', () => {
    const defaultState: IAuthState = {
        pending: false,
        errors: undefined,
        user: undefined
    }

    it('should return default state', () => {
        expect(reducer(defaultState, { type: 'none' })).toEqual(defaultState);
    });

    describe('on logoutRequest', () => {
        it('should set pending to true', () => {
            expect(reducer(defaultState, logoutRequest)).toEqual({
                ...defaultState,
                pending: true
            });
        });
    });

    describe('on logoutSuccess', () => {
        it('should return default state', () => {
            expect(reducer(defaultState, logoutSuccess)).toEqual(defaultState);
        });
    });

    describe('on clearErrors', () => {
        it('should set errors to undefined', () => {
            expect(reducer({ ...defaultState, errors: ['test'] }, clearErrors)).toEqual({
                ...defaultState,
                errors: undefined
            });
        });
    });

    describe('on registerRequest / loginRequest / getProfileRequest', () => {
        it('should set pending to true', () => {
            expect(reducer(defaultState, registerRequest)).toEqual({
                ...defaultState,
                pending: true
            });

            expect(reducer(defaultState, loginRequest)).toEqual({
                ...defaultState,
                pending: true
            });

            expect(reducer(defaultState, getProfileRequest)).toEqual({
                ...defaultState,
                pending: true
            });
        });
    });

    describe('on registerError, loginError, getProfileError', () => {
        it('should set pending to true', () => {
            expect(reducer({ ...defaultState, pending: true}, registerError(['error test']))).toEqual({
                ...defaultState,
                pending: false,
                errors: ['error test']
            });

            expect(reducer({ ...defaultState, pending: true}, loginError(['error test123']))).toEqual({
                ...defaultState,
                pending: false,
                errors: ['error test123']
            });

            expect(reducer({ ...defaultState, pending: true}, getProfileError(['error testxx']))).toEqual({
                ...defaultState,
                pending: false,
                errors: ['error testxx']
            });
        });
    });

    describe('on registerSuccess / loginSuccess / getProfileSuccess', () => {
        it('should set pending to true', () => {
            const user: IAuthUser = {
                ID: 10,
                email: 'john@doe.com',
                username: 'John Doe'
            }

            expect(reducer({ ...defaultState, pending: true}, registerSuccess(user))).toEqual({
                ...defaultState,
                pending: false,
                user
            });

            expect(reducer({ ...defaultState, pending: true}, loginSuccess(user))).toEqual({
                ...defaultState,
                pending: false,
                user
            });

            expect(reducer({ ...defaultState, pending: true}, getProfileSuccess(user))).toEqual({
                ...defaultState,
                pending: false,
                user
            });
        });
    });
});