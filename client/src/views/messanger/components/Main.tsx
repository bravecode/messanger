import React from 'react';

import { MessageGroup } from './main/MessageGroup';
import { Footer } from './main/Footer';
import { Game } from './main/Game';
import { useSelector } from 'react-redux';
import { IStore } from '_store';

const Main: React.FC = () => {
    const { activeConversationID, pending, groups } = useSelector((store: IStore) => store.messages);

    if (!activeConversationID) {
        return <div>Select conversation on left side menu.</div>
    }

    if (pending) {
        return <div>Loading</div>
    }

    return (
       <div>
            {
                groups?.map((group) => 
                    <MessageGroup
                        author={{
                            username: group.authorName
                        }}
                        messages={group.messages}
                        type={group.isAuthor ? 'sent' : 'received'}
                    />
                )
            }

            <Footer />
       </div>
    )
}

export { Main }