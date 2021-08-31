import React from 'react';

import { Side } from './components/side/Side';
import { Header } from './components/main/Header';
import { Main } from './components/Main';

const Messanger: React.FC = () => {
    return (
        <div className="grid grid-cols-3">
            
            <Side />

            <div className="col-span-2 px-10 py-2.5">

                <Header />
                
                <Main />

            </div>

        </div>
    );
}

export default Messanger;
