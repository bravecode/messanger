import React from 'react';

export interface IGameProps {
    status: TGameStatus;
}

export type TGameStatus = 'sent' | 'received' | 'finished';

const Game: React.FC<IGameProps> = ({ status }) => {
    const renderStatus = () => {
        // Note: This status should also display 3 icons and let user choose.
        if (status === 'received') {
            return (
                <div>
                    <p>'User X challenged you. Your turn.'</p>
                    <div className="w-full flex gap-2.5">
                        <button>
                            Paper
                        </button>
                        <button>
                            Rock
                        </button>
                        <button>
                            Scissors
                        </button>
                    </div>
                </div>
            )
        }

        // Note: Display your choice
        if (status === 'sent') {
            return 'Waiting for the User X response. Your choice - Paper'
        }

        // Note: Display who won and how as well as stats (all games)
        if (status === 'finished') {
            return 'Game has been finished. You won!'
        }
    }

    return (
        <div className="w-full flex justify-center mb-2.5">
            <div className="bg-gray-200 text-gray-800 rounded-lg p-2.5 leading-normal text-sm">
                { renderStatus() }
            </div>
        </div>
    );
}

export { Game }
