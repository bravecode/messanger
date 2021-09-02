import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';

import { sendMessage } from '_services/message.service';
import { IStore } from '_store';

const MessageInput: React.FC = () => {
    const { activeConversationID } = useSelector((store: IStore) => store.messages)
    const [message, setMessage] = useState('');

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
    }

    const handleSubmit = () => {
        if (!activeConversationID || !message.length) {
            return;
        }

        sendMessage(activeConversationID, message);

        setMessage('')
    }

    return (
        <div className="relative h-10 w-full">
            <input 
                type="text" 
                className="bg-gray-100 rounded-lg border-none text-gray-500 outline-none h-full px-2.5 text-sm w-full" 
                placeholder="Type something here"
                name="message"
                value={message}
                onChange={handleInputChange}
            />
            {
                !!message.length && (
                    <button className="absolute w-10 h-10 top-0 right-0 flex items-center justify-center" onClick={handleSubmit}>
                        <PaperAirplaneIcon className="w-5 h-5 text-blue-500" />
                    </button>
                )
            }
        </div>
    );
}

export { MessageInput }
