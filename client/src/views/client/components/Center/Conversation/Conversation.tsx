import React from 'react';
import { Footer } from './Footer/Footer';

// Components
import { Header } from './Header/Header';
import { MessageGroup } from './MessageGroup/MessageGroup';

const Conversation: React.FC = () => {
    return (
        <div className="h-full w-full flex flex-col">

            <Header />

            <div className="h-full">
                <MessageGroup
                    userName="John Doe"
                    type="sent"
                    messages={[
                        "Hey there, what's going on?"
                    ]}
                />

                <MessageGroup
                    userName="Krzysztof"
                    type="received"
                    messages={[
                        "Nothing, just chilling."
                    ]}
                />

                <MessageGroup
                    userName="John Doe"
                    type="sent"
                    messages={[
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ]}
                />

                <MessageGroup
                    userName="Krzysztof"
                    type="received"
                    messages={[
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    ]}
                />
            </div>

            <Footer />

        </div>
    );
}

export { Conversation }