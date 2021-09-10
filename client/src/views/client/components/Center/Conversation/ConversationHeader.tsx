import React from 'react';

// Components
import { ConversationHeaderGame } from './ConversationHeaderGame';

const ConversationHeader: React.FC = () => {
    return (
        <header className="w-full flex items-center justify-between">

            <div className="flex items-center gap-2.5">
                <div className="h-12 w-12 bg-custom-backgorund text-white flex items-center justify-center rounded-full">
                    K
                </div>
                <div>
                    <div className="text-black text-base font-semibold">
                        John Doe
                    </div>
                    <div className="text-custom-gray-dark text-xs">
                        Online
                    </div>
                </div>
            </div>

            <ConversationHeaderGame />

        </header>
    );
}

export { ConversationHeader }
