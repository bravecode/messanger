import React from 'react';
import { FooterEmoji } from './FooterEmoji';

// Components
import { FooterGame } from './FooterGame';
import { FooterInput } from './FooterInput';

const Footer: React.FC = () => {
    return (
        <div className="w-full h-10 flex gap-2.5 flex-shrink-0">

            <FooterGame />

            <FooterInput />

            <FooterEmoji />

        </div>
    );
}

export { Footer }