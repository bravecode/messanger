import React from 'react';
import { useSelector } from 'react-redux';

import { IStore } from '_store';

// Screens
import { ChooseConversation } from './ChooseConversation/ChooseConversation';
import { Conversation } from './Conversation/Conversation';

const Center: React.FC = () => {
    const { activeConversationID } = useSelector((store: IStore) => store.messages);

    const renderScreen = () => {
        if (!activeConversationID) {
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