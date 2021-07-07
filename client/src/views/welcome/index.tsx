import React from 'react';
import logoPath from '../../_assets/svg/logo.svg';

import { UserProfile } from './components/UserProfile';
import { Tabs } from './components/Tabs';
import { Message } from './components/Message';

const Welcome: React.FC = () => (
    <div className="font-Poppins h-screen w-screen bg-gray-200">

        <nav className="p-5 relative top-0 inset-x-0 flex items-center justify-between">
            <div className="h-16 w-16 flex items-center justify-center bg-black">
                <img src={logoPath} alt="Bravecode Logo - Lion" />
            </div>
            <div>
                
            </div>
        </nav>

        <main className="container mx-auto grid grid-cols-3 bg-white rounded-lg">
            
            <div className="p-5">
                <UserProfile />
                <Tabs />
                <div className="grid gap-4">
                <Message />
                <Message />
                <Message />
                <Message />
                </div>
            </div>

            <div className="p-5 col-span-2">
                Messanger
            </div>

        </main>

    </div>
);

export default Welcome;
