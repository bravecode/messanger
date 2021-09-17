import React from 'react';
import { useSelector } from 'react-redux';

import { IStore } from '_store';

// Components
import { Header } from './Header/Header';
import { MessageGroup } from './MessageGroup/MessageGroup';
import { Footer } from './Footer/Footer';

const Conversation: React.FC = () => {
    const { groups } = useSelector((store: IStore) => store.messages);

    return (
        <div className="h-full w-full flex flex-col">

            <Header />

            <div className="h-full">
                {
                    groups.map((group, i) =>
                        <MessageGroup
                            key={i}
                            userName={group.authorName}
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