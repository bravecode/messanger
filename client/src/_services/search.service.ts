import axios from 'axios';
import { TypesUserSearchResponse } from './types';

export {
    searchUsers
}

function searchUsers(username: string) {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = `http://localhost:8000/users/search?username=${username}`;

    return axios.get<TypesUserSearchResponse[]>(
        URL,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
}