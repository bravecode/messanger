import axios from 'axios';
import { TypesConversationMessage } from './types';

export {
    getConversationMessages
}

function getConversationMessages(ID: number) {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = `http://localhost:8000/conversations/${ID}`;

    return axios.get<TypesConversationMessage[]>(
        URL,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
}