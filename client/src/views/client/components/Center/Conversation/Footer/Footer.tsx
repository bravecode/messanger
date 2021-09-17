import React from 'react';
import { useSelector } from 'react-redux';

import { IStore } from '_store';

// Components
import { FooterGame } from './FooterGame';
import { FooterInput } from './FooterInput';
import { FooterEmoji } from './FooterEmoji';
import { sendMessage } from '_services/message.service';

const Footer: React.FC = () => {
    const { activeConversationID } = useSelector((store: IStore) => store.messages);

    // Handlers
    const handleMessageSend = (value: string) => {
        if (!activeConversationID) {
            return;
        }

        sendMessage(activeConversationID, value);
    }

    return (
        <div className="w-full h-10 flex gap-2.5 flex-shrink-0">

            <FooterGame />

            <FooterInput onSubmit={handleMessageSend} />

            <FooterEmoji onSubmit={handleMessageSend} />

        </div>
    );
}

export { Footer }