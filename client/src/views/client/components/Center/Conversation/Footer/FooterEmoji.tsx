import React, { useState } from 'react';
import { IoHappy, IoThumbsUp } from 'react-icons/io5';
import classNames from 'classnames';

// Components
import { EmojiPicker } from '_components/emoji/EmojiPicker';

export interface IFooterEmojiProps {
    onSubmit: (value: string) => void;
}

const FooterEmoji: React.FC<IFooterEmojiProps> = ({
    onSubmit
}) => {
    const [open, setOpen] = useState(false);
    
    // Handlers
    const handleEmojiPickerToggle = () => {
        setOpen((prev) => !prev);
    }

    const handleEmojiPickerSelect = (value: string) => {
        setOpen(false);

        onSubmit(value);
    }

    const onThumbsUp = () => {
        onSubmit(`👍`);
    }

    // Styles
    const _pickerButtonStyles = classNames({
        'h-10 w-10 rounded-md flex items-center justify-center flex-shrink-0 relative hover:bg-purple-500 hover:text-white': true,
        'text-custom-gray-dark bg-custom-gray-lightest': !open,
        'bg-purple-500 text-white': open
    });

    return (
        <>
            <button className={_pickerButtonStyles} onClick={handleEmojiPickerToggle}>
                <EmojiPicker 
                    open={open}
                    onSelect={handleEmojiPickerSelect}
                />

                <IoHappy color="inherit" />
            </button>
            <button className="h-10 w-10 rounded-md flex items-center justify-center text-custom-gray-dark bg-custom-gray-lightest flex-shrink-0 hover:bg-purple-500 hover:text-white" onClick={onThumbsUp}>
                <IoThumbsUp color="inherit" />
            </button>
        </>
    );
}

export { FooterEmoji }