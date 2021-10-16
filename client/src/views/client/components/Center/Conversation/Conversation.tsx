import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IStore } from '_store';

// Components
import { Header } from './Header/Header';
import { MessageGroup } from './MessageGroup/MessageGroup';
import { Footer } from './Footer/Footer';
import { IRelationship } from '_store/ducks/relationship/reducer';

const Conversation: React.FC = () => {
    const { user } = useSelector((store: IStore) => store.auth);
    const { friends } = useSelector((store: IStore) => store.relationship);
    const { groups, activeConversationID } = useSelector((store: IStore) => store.messages);

    // Scroll to the bottom on new messages
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!container.current) return;

        container.current.scrollTop = container.current.scrollHeight - container.current.clientHeight;
    }, [groups]);

    // Helpers
    const getConversationRelation = (): IRelationship | null => {
        if (!activeConversationID) {
            return null;
        }

        const activeConversationRelation = friends.find((f) => f.ID === activeConversationID);
        
        if (!activeConversationRelation) {
            return null;
        }

        return activeConversationRelation;
    }

    const getAuthorName = (author: boolean, relation: IRelationship) => {
        if (author) {
            return user?.username ?? '';
        }

        return relation.userName ?? '';
    }

    const conversationRelation = getConversationRelation();

    if (!conversationRelation) {
        return null;
    }

    return (
        <div className="h-full w-full">

            <Header 
                userName={conversationRelation.userName}
                online={conversationRelation.online}
            />

            <div className="h-full w-full flex-shrink overflow-y-auto py-5" style={{ height: 'calc(100% - 128px)'}} ref={container}>
                    {
                        groups.map((group, i) =>
                            <MessageGroup
                                key={i}
                                userName={getAuthorName(group.isAuthor, conversationRelation)}
                                type={group.isAuthor ? 'sent' : 'received'}
                                messages={group.messages}
                            />
                        )
                    }
                </div>

            <Footer />

        </div>
    );
}

export { Conversation }