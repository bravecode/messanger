import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IStore } from '_store';
import { getConversationsRequest } from '_store/ducks/conversations/actions';
import { getConversationMessagesRequest } from '_store/ducks/messages/actions';

import { ConversationsItem } from './ConversationsItem';

const Conversations: React.FC = () => {
    const dispatch = useDispatch();
    const { conversations, pending } = useSelector((store: IStore) => store.conversations)
    const { activeConversationID } = useSelector((store: IStore) => store.messages);

    useEffect(() => {
        dispatch(getConversationsRequest());
    }, [dispatch]);

    // Handlers
    const handleConversationSelect = (ID: number) => {
        dispatch(getConversationMessagesRequest(ID))
    }

    if (pending) {
        return <div>Loading ...</div>
    }

    if (!conversations.length) {
        return <div>No conversations opened yet.</div>
    }

    return (
        <div className="grid gap-4">
            
            {
                conversations.map((conversation) =>
                    <ConversationsItem
                        key={conversation.relationID}
                        relationshipID={conversation.relationID}
                        lastMessage={conversation.lastMessage}
                        active={conversation.relationID === activeConversationID}
                        onConversationSelect={handleConversationSelect}
                    />
                )
            }
    
        </div>
    );
}

export { Conversations }
