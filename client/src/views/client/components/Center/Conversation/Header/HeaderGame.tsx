import React from 'react';
import { IoGameController } from "react-icons/io5";

const HeaderGame: React.FC = () => {
    return (
        <div className="h-12 relative rounded-l-full bg-custom-gray-lightest rounded-r-2xl">
            <div className="h-12 w-12 rounded-full bg-purple-500 absolute left-0 top-0 flex items-center justify-center">
                <IoGameController className="text-white" />
            </div>
            <div className="h-12 flex items-end ml-12 px-5 gap-2.5">
                <div>
                    <div className="text-xs font-semibold text-custom-gray-dark">
                        YOU
                    </div>
                    <div className="font-semibold text-purple-500 text-xl">
                        32
                    </div>
                </div>
                <div className="text-xs">
                    VS
                </div>
                <div>
                    <div className="text-xs font-semibold text-custom-gray-dark">
                        KRZ...
                    </div>
                    <div className="font-semibold text-purple-500 text-xl">
                        17
                    </div>
                </div>
            </div>
        </div>
    );
}

export { HeaderGame }