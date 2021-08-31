import React from 'react';

import { MessageGroup } from './main/MessageGroup';
import { Footer } from './main/Footer';
import { Game } from './main/Game';
import { useSelector } from 'react-redux';
import { IStore } from '_store';

const Main: React.FC = () => {
    const { activeConversationID, pending } = useSelector((store: IStore) => store.messages);

    if (!activeConversationID) {
        return <div>Select conversation on left side menu.</div>
    }

    if (pending) {
        return <div>Loading</div>
    }

    return (
       <div>
            <MessageGroup 
                author={{
                    username: 'John Doe',
                }}
                messages={[
                    'Hello World!',
                    'How are you doing?'
                ]}
                type='received'
            />

            <MessageGroup 
                author={{
                    username: 'John Doe',
                }}
                messages={[
                    'Hello World!',
                    'How are you doing?'
                ]}
                type='sent'
            />

            <Game status="received" />

            <Game status="finished" />

            <MessageGroup 
                author={{
                    username: 'John Doe',
                }}
                messages={[
                    'Hello World!',
                    'How are you doing?'
                ]}
                type='received'
            />

            <Game status="sent" />

            <Footer />
       </div>
    )
}

export { Main }