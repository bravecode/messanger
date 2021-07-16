import axios from 'axios';
import { IAuthUser } from '_store/ducks/auth/reducer';
import { TypesAuthResponse, TypesErrorResponse, TypesRegisterDTO, TypesUserResponse } from './types';

export {
    register,
    login,
    getProfile,
}

function register(username: string, email: string, password: string) {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = 'http://localhost:8000/auth/register';

    const registerDTO: TypesRegisterDTO = {
        username,
        email,
        password
    } 

    return axios.post<TypesAuthResponse>(URL, registerDTO);
}

function login(email: string, password: string) {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = 'http://localhost:8000/auth/login';

    return axios.post<TypesAuthResponse>(URL, {
        email,
        password
    });
}

function getProfile() {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = 'http://localhost:8000/auth/profile';

    return axios.get<TypesUserResponse>(URL, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}
