import axios from 'axios';
import { TypesRelationshipInviteDTO, TypesRelationshipResponse } from './types';

export { 
    getRelationships,
    invite,
    accept,
    decline
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

function invite(userID: number) {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = 'http://localhost:8000/relationship';

    const inviteDTO: TypesRelationshipInviteDTO = {
        to: userID
    }

    return axios.post(
        URL,
        inviteDTO,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }
    ); 
}

function accept(requestID: number) {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = `http://localhost:8000/relationship/${requestID}/accept`;

    return axios.get(
        URL,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }
    ); 
}

function decline(requestID: number) {
    // Note: Move API urls to .env file to make it env specific (good practice).
    const URL = `http://localhost:8000/relationship/${requestID}/decline`;

    return axios.get(
        URL,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }
    ); 
}