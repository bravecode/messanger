import rawStore from '_store';
import { TypesConversationMessageDTO, TypesSocketEvent } from './types';

export {
    sendMessage
}

function sendMessage(relationshipID: number, content: string) {
    const connection = rawStore.getState().socket.connection;

    if (!connection) {
        console.log('Socket connection is undefined.')

        return;
    }

    const event: TypesSocketEvent = {
        event: 'CONVERSATION:MESSAGE'
    }

    const data: TypesConversationMessageDTO = {
        relationship_id: relationshipID,
        content
    }

    connection.send(
        JSON.stringify({
            ...event,
            ...data
        })
    )

    // TODO: Handle Success / Error
}