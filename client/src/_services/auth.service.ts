import axios from 'axios';
import { TypesAuthResponse, TypesLoginDTO, TypesRegisterDTO, TypesUserResponse } from './types';

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
        password,
    } 

    return axios.post<TypesAuthResponse>(URL, registerDTO);
}

function login(email: string, password: string) {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = 'http://localhost:8000/auth/login';

    const loginDTO: TypesLoginDTO = {
        email,
        password,
    }

    return axios.post<TypesAuthResponse>(URL, loginDTO);
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
