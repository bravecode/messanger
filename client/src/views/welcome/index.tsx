import React from 'react';
import logoPath from '../../_assets/svg/logo.svg';

const Welcome: React.FC = () => (
    <div className="font-Poppins">

        <nav className="p-5 relative top-0 inset-x-0 flex items-center justify-between">
            <div className="h-16 w-16 flex items-center justify-center bg-black">
                <img src={logoPath} alt="Bravecode Logo - Lion" />
            </div>
            <div>
                
            </div>
        </nav>

        <main className="container mx-auto grid grid-cols-3">
            
            <div className="bg-gray-600 p-2.5">
                Menu
            </div>

            <div className="bg-gray-300 p-2.5 col-span-2">
                Messanger
            </div>

        </main>

    </div>
);

export default Welcome;
