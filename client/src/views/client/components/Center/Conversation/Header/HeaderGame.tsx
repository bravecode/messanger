import React from 'react';
import { IoGameController } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { IStore } from '_store';

const HeaderGame: React.FC = () => {
    const { score } = useSelector((store: IStore) => store.game);

    return (
        <div className="h-12 relative rounded-l-full bg-custom-gray-lightest">
            <div className="h-12 w-12 rounded-full bg-purple-500 absolute left-0 top-0 flex items-center justify-center">
                <IoGameController className="text-white" />
            </div>
            <div className="h-12 flex items-center ml-12 px-5 pt-4">
               <div className="flex items-end gap-2.5">
                    <div className="font-semibold text-purple-500 text-lg leading-none relative">
                        <div className="text-xs absolute left-0 bottom-full mb-0.5 whitespace-nowrap">
                            Your Score:
                        </div>
                        { score.you }
                    </div>
                    <div className="text-xs leading-none">
                        VS
                    </div>
                    <div className="font-semibold text-custom-gray-regular text-lg leading-none">
                        { score.enemy }
                    </div>
               </div>
            </div>
        </div>
    );
}

export { HeaderGame }