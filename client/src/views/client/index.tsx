import React from 'react';
import { Center } from './components/Center/Center';

// Components
import { Side } from './components/Side/Side';

const Client: React.FC = () => {
    return (
        <div className="h-screen w-screen bg-custom-backgorund flex flex-nowrap items-center justify-center">

            <div style={{ width: '1280px', height: '670px' }} className="bg-white rounded-2xl overflow-hidden flex">
                
                <Side />

                <Center />

            </div>

        </div>
    );
}

export default Client;
