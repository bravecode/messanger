import React from 'react';

import { Side } from './components/side/Side';
import { MessageGroup } from './components/main/MessageGroup';
import { Header } from './components/main/Header';
import { Footer } from './components/main/Footer';
import { Game } from './components/main/Game';

const Messanger: React.FC = () => {
    return (
        <div className="grid grid-cols-3">
            
            <Side />

            <div className="col-span-2 px-10 py-2.5">

                <Header />
                
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

        </div>
    );
}

export default Messanger;
