import rawStore from '_store';
import { TypesGameChoiceDTO, TypesSocketEvent } from './types';

export {
    makeGameMove
}

export type TGameChoice = 'paper' | 'rock' | 'scissors';

function makeGameMove(relationshipID: number, choice: TGameChoice) {
    const connection = rawStore.getState().socket.connection;

    if (!connection) {
        console.log('Socket connection is undefined.')

        return;
    }

    const event: TypesSocketEvent = {
        event: 'GAME:CHOICE'
    }

    const data: TypesGameChoiceDTO = {
        choice: choice,
        relationship_id: relationshipID
    }

    connection.send(
        JSON.stringify({
            ...event,
            ...data
        })
    );
}