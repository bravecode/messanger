import axios from 'axios';
import rawStore from '_store/index';
import { TypesConversation, TypesConversationOpenDTO, TypesSocketEvent } from './types';

export {
    openConversation,
    getConversations,
    getConversationMessages
}

function openConversation(relationshipID: number) {
    const connection = rawStore.getState().socket.connection;

    if (!connection) {
        console.log('Socket connection is undefined.')

        return;
    }

    const event: TypesSocketEvent = {
        event: 'CONVERSATION:OPEN'
    }

    const data: TypesConversationOpenDTO = {
        relationship_id: relationshipID
    }

    connection.send(
        JSON.stringify({
            ...event,
            ...data
        })
    )

    // TODO: Handle Success / Error
}

function getConversations() {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = 'http://localhost:8000/conversations';

    return axios.get<TypesConversation[]>(
        URL,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
}

function getConversationMessages(ID: number) {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = `http://localhost:8000/conversations/${ID}`;

    return axios.get<string[]>(
        URL,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
}