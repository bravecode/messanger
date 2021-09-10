import React from 'react';

// Components
import { ConversationHeader } from './ConversationHeader';

const Conversation: React.FC = () => {
    return (
        <div className="h-full w-full">

            <ConversationHeader />

        </div>
    );
}

export { Conversation }