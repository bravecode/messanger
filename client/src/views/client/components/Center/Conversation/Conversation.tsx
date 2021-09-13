import React from 'react';
import { Footer } from './Footer/Footer';

// Components
import { Header } from './Header/Header';

const Conversation: React.FC = () => {
    return (
        <div className="h-full w-full flex flex-col">

            <Header />

            <div className="h-full">

            </div>

            <Footer />

        </div>
    );
}

export { Conversation }