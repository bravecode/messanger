import React from 'react';

// Screens
import { ChooseConversation } from './ChooseConversation/ChooseConversation';
import { Conversation } from './Conversation/Conversation';

const Center: React.FC = () => {
    const conversationID = '123';

    const renderScreen = () => {
        if (!conversationID) {
            return <ChooseConversation />
        }

        return <Conversation />
    }

    return (
        <div className="h-full w-full p-5">
            { renderScreen() }
        </div>
    );
}

export { Center }