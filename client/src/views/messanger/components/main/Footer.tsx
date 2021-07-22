import React, { useState } from 'react';
import { ThumbUpIcon, EmojiHappyIcon, PhotographIcon, PuzzleIcon } from '@heroicons/react/outline';
import { Emoji } from '_components/emoji/Emoji';
import { EmojiPicker } from '_components/emoji/EmojiPicker';

const Footer: React.FC = () => {
    const [pickerOpen, setPickerOpen] = useState(false);

    // Handlers
    const handleEmojiPickerToggle = () => {
        setPickerOpen((prev) => !prev);
    }

    const handleEmojiPickerSelect = (value: string) => {
        setPickerOpen(false);

        console.log(value);
    }

    const onThumbsUp = () => {
        console.log(`👍`);
    }

    return (
        <div className="border-t border-gray-200 border-solid p-5 mt-20 flex gap-2.5">
            <div className="h-10 w-10 flex items-center justify-center">
                <PhotographIcon
                    className="text-gray-300 w-6"
                />
            </div>
            <div className="h-10 w-10 flex items-center justify-center">
                <PuzzleIcon 
                    className="text-gray-300 w-6"
                />
            </div>
            <input 
                type="text" 
                className="bg-gray-100 rounded-lg border-none text-gray-500 outline-none h-10 px-2.5 text-sm w-full" 
                placeholder="Type something here"
                />
            <div className="h-10 w-10 flex items-center justify-center relative">
                <EmojiPicker 
                    open={pickerOpen}
                    onSelect={handleEmojiPickerSelect}
                />

                <button className="text-gray-300 w-6 hover:text-blue-400 transition cursor-pointer" onClick={handleEmojiPickerToggle}>
                    <EmojiHappyIcon className="w-full" />
                </button>
            </div>
            <div className="h-10 w-10 flex items-center justify-center">
                <button className="text-gray-300 w-6 hover:text-blue-400 transition cursor-pointer" onClick={onThumbsUp}>
                    <ThumbUpIcon className="w-full" />
                </button>
            </div>
        </div>
    );
}

export { Footer }
