import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IStore } from '_store';
import { getConversationsRequest } from '_store/ducks/conversations/actions';

import { ConversationsItem } from './ConversationsItem';

const Conversations: React.FC = () => {
    const { conversations, pending } = useSelector((store: IStore) => store.conversations)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getConversationsRequest());
    }, [dispatch]);

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
                        lastMessage={conversation.messages[conversation.messages.length - 1]}
                    />
                )
            }
    
        </div>
    );
}

export { Conversations }
