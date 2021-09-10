import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '_store';

const GameShowcase: React.FC = () => {    
    const { currentGame, score } = useSelector((store: IStore) => store.game);

    if (!currentGame || !score) {
        return null;
    }

    return (
        <div className="h-16 w-full bg-blue-500 rounded-lg p-2.5 flex items-center justify-between">
            <div className="flex gap-5">
                <div className="text-center text-white">
                    <div className="text-xs">
                        You
                    </div>
                    <div className="text-lg">
                        { score.yourScore }
                    </div>
                </div>
                <div className="text-center text-white">
                    <div className="text-xs">
                        John Doe
                    </div>
                    <div className="text-lg">
                        { score.foeScore }
                    </div>
                </div>
            </div>
            <div className="flex gap-2 text-white">
                <button>
                    PAPER
                </button>
                <button>
                    SCISSORS
                </button>
                <button>
                    ROCK
                </button>
            </div>
        </div>
    );
}

export { GameShowcase }