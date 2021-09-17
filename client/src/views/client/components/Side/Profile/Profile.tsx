import React from 'react';
import { Link } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import { IStore } from '_store';

const Profile: React.FC = () => {
    const { user } = useSelector((store: IStore) => store.auth);

    return (
        <div className="h-12 w-full flex items-center justify-between px-5">

            <div className="h-full flex gap-2.5 items-center">

                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-purple-500 text-white text-sm font-semibold">
                    { user?.username[0] }
                </div>

                <div>
                    <div className="text-black text-base font-semibold">
                        { user?.username }
                    </div>
                    <div className="text-custom-gray-dark text-xs">
                        Online
                    </div>
                </div>

            </div>


            <div className="h-full flex items-center relative">

                <Link to="/auth/logout" className="text-custom-gray-regular hover:text-black">
                    <IoLogOutOutline color="inherit" size="18px" />
                </Link>

            </div>

        </div>
    );
}

export { Profile }