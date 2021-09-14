import React from 'react';
import classNames from 'classnames';
import { EmojiPickerButton } from './EmojiPickerButton';

export interface IEmojiPickerProps {
    open: boolean;
    onSelect: (value: string) => void;
}

const EmojiPicker: React.FC<IEmojiPickerProps> = ({
    open,
    onSelect
}) => {
    const _containerStyles = classNames({
        'w-48 absolute bottom-full right-0 mb-2.5 bg-white shadow-md p-2.5 grid grid-cols-6 rounded-md': true,
        'hidden': !open,
    });


    return (
        <div className={_containerStyles}>
            <EmojiPickerButton symbol="😀" label="Emoji - grinning face" onSelect={onSelect} />
            <EmojiPickerButton symbol="😁" label="Emoji - beaming face with smiling eyes" onSelect={onSelect} />
            <EmojiPickerButton symbol="😆" label="Emoji - grinning squinting face" onSelect={onSelect} />
            <EmojiPickerButton symbol="😅" label="Emoji - grinning face with sweat" onSelect={onSelect} />
            <EmojiPickerButton symbol="😂" label="Emoji - face with tears of joy" onSelect={onSelect} />
            <EmojiPickerButton symbol="🤣" label="Emoji - rolling on the floor laughing" onSelect={onSelect} />

            <EmojiPickerButton symbol="😊" label="Emoji - smiling face with smiling eyes" onSelect={onSelect} />
            <EmojiPickerButton symbol="😇" label="Emoji - smiling face with halo" onSelect={onSelect} />
            <EmojiPickerButton symbol="🙂" label="Emoji - slightly smiling face" onSelect={onSelect} />
            <EmojiPickerButton symbol="🙃" label="Emoji - upside-down face" onSelect={onSelect} />
            <EmojiPickerButton symbol="😉" label="Emoji - winking face" onSelect={onSelect} />
            <EmojiPickerButton symbol="😋" label="Emoji - face savoring food" onSelect={onSelect} />

            <EmojiPickerButton symbol="😍" label="Emoji - smiling face with heart-eyes" onSelect={onSelect} />
            <EmojiPickerButton symbol="🥰" label="Emoji - smiling face with hearts" onSelect={onSelect} />
            <EmojiPickerButton symbol="😘" label="Emoji - face blowing a kiss" onSelect={onSelect} />
            <EmojiPickerButton symbol="😎" label="Emoji - smiling face with sunglasses" onSelect={onSelect} />
            <EmojiPickerButton symbol="🙁" label="Emoji - slightly frowning face" onSelect={onSelect} />
            <EmojiPickerButton symbol="🥺" label="Emoji - pleading face" onSelect={onSelect} />

            <EmojiPickerButton symbol="😡" label="Emoji - pouting face" onSelect={onSelect} />
            <EmojiPickerButton symbol="🥵" label="Emoji - hot face" onSelect={onSelect} />
            <EmojiPickerButton symbol="🤔" label="Emoji - thinking face" onSelect={onSelect} />
            <EmojiPickerButton symbol="🤫" label="Emoji - shushing face" onSelect={onSelect} />
            <EmojiPickerButton symbol="🙈" label="Emoji - see-no-evil monkey" onSelect={onSelect} />
            <EmojiPickerButton symbol="🙉" label="Emoji - hear-no-evil monkey" onSelect={onSelect} />
        </div>

    );
}

export { EmojiPicker }
