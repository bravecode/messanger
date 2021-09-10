import React, { useState } from 'react';
import { EmojiPicker } from '_components/emoji/EmojiPicker';
import { FooterGame } from './FooterGame';
import { MessageInput } from './footer/MessageInput';

const Footer: React.FC = () => {
    const [pickerOpen, setPickerOpen] = useState(false);
    const [gameOpen, setGameOpen] = useState(false);

    // Handlers
    const handleEmojiPickerToggle = () => {
        setPickerOpen((prev) => !prev);
    }

    const handleGameToggle = () => {
        setGameOpen((prev) => !prev);
    }

    const handleEmojiPickerSelect = (value: string) => {
        setPickerOpen(false);
        setGameOpen(false);

        console.log(value);
    }

    const onThumbsUp = () => {
        console.log(`👍`);
    }

    return (
        <div className="border-t border-gray-200 border-solid p-5 mt-20 flex gap-2.5">
            <div className="h-10 w-10 flex items-center justify-center relative">
                <FooterGame 
                    open={gameOpen}
                    onSelect={handleEmojiPickerSelect}
                />

                <button className="text-gray-300 w-6 hover:text-blue-400 transition cursor-pointer" onClick={handleGameToggle}>

                </button>
            </div>
            <MessageInput />
            <div className="h-10 w-10 flex items-center justify-center relative">
                <EmojiPicker 
                    open={pickerOpen}
                    onSelect={handleEmojiPickerSelect}
                />

                <button className="text-gray-300 w-6 hover:text-blue-400 transition cursor-pointer" onClick={handleEmojiPickerToggle}>

                </button>
            </div>
            <div className="h-10 w-10 flex items-center justify-center">
                <button className="text-gray-300 w-6 hover:text-blue-400 transition cursor-pointer" onClick={onThumbsUp}>

                </button>
            </div>
        </div>
    );
}

export { Footer }
