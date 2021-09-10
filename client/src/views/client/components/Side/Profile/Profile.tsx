import React from 'react';

const Profile: React.FC = () => {
    return (
        <div className="h-12 w-full flex gap-2.5 items-center">

            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-purple-500 text-white text-sm font-semibold">
                J 
            </div>

            <div>
                <div className="text-black text-base font-semibold">
                    John Doe
                </div>
                <div className="text-custom-gray-dark text-xs">
                    Online
                </div>
            </div>

        </div>
    );
}

export { Profile }