import React from 'react';

// Components
import { HeaderGame } from './HeaderGame';

export interface IHeaderProps {
    userName: string;
    online?: boolean;
}

const Header: React.FC<IHeaderProps> = ({
    userName,
    online
}) => {
    return (
        <header className="w-full flex items-center justify-between flex-shrink-0 border-b border-custom-gray-light pb-2.5 mb-2.5">

            <div className="flex items-center gap-2.5">
                <div className="h-12 w-12 bg-custom-backgorund text-white flex items-center justify-center rounded-full">
                    { userName[0] }
                </div>
                <div>
                    <div className="text-black text-base font-semibold">
                        { userName }
                    </div>
                    <div className="text-custom-gray-dark text-xs">
                        { online ? 'Online' : 'Offline' }
                    </div>
                </div>
            </div>

            <HeaderGame />

        </header>
    );
}

export { Header }
