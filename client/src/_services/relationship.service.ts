import axios from 'axios';
import { TypesRelationshipResponse } from './types';

export { 
    getRelationships
}

function getRelationships() {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = 'http://localhost:8000/relationship';

    return axios.get<TypesRelationshipResponse>(
        URL,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
}