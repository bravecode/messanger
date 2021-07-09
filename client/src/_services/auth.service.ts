import axios from 'axios';

export {
    register,
    login
}

function register (username: string, email: string, password: string) {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = 'http://localhost:8000/auth/register';

    return axios.post(URL, {
        username,
        email,
        password
    });
}

function login (email: string, password: string) {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = 'http://localhost:8000/auth/login';

    return axios.post(URL, {
        email,
        password
    });
}