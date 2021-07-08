import React from 'react';
import { ThumbUpIcon, EmojiHappyIcon, PhotographIcon, PuzzleIcon } from '@heroicons/react/outline';

const Footer: React.FC = () => (
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
        <div className="h-10 w-10 flex items-center justify-center">
            <EmojiHappyIcon 
                className="text-gray-300 w-6"
            />
        </div>
        <div className="h-10 w-10 flex items-center justify-center">
            <ThumbUpIcon
                className="text-gray-300 w-6"
            />
        </div>
    </div>
);

export { Footer }
