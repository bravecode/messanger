import React from 'react';

import { UserAvatar } from '_components/user/UserAvatar';
import { GameShowcase } from './game/GameShowcase';

const Header: React.FC = () => (
    <>
        <header className="h-20 flex items-center justify-between">
            <div className="flex items-center">
                <UserAvatar />
                <div className="px-4">
                    <div className="text-black text-sm text-bold mb-0.5">
                        Krzysztof Szymański
                    </div>
                    <div className="text-gray-500 text-xs">
                        Working on a new project.
                    </div>
                </div>
            </div>
            <div className="flex divide-x divide-gray-200">
                <div />
                <div className="pl-5">
                </div>
            </div>
        </header>
        <GameShowcase />
    </>
);

export { Header }
