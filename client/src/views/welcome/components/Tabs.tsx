import React from 'react';
import { Link } from 'react-router-dom';

const Tabs: React.FC = () => {
    return (
        <nav className="h-10 grid grid-cols-4 my-8 bg-gray-300">
            <div className="h-full flex items-center justify-center">
                <Link to="/auth/logout">
                    Logout
                </Link>
            </div>
            <div className="h-full flex items-center justify-center">
                dsad
            </div>
            <div className="h-full flex items-center justify-center">
                X
            </div>
            <div className="h-full flex items-center justify-center">
                X
            </div>
        </nav>
    );
}

export { Tabs }