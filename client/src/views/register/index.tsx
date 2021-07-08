import React from 'react';
import { Link } from 'react-router-dom';

import { Label } from '_components/form/Label';
import { Input } from '_components/form/Input';


const Register: React.FC = () => {
    return (
        <div className="grid justify-center">
            
            <header className="mb-5">
                <h1 className="text-xl mb-1">
                    Sign Up 
                </h1>
                <p className="text-sm text-gray-400">
                    Create new Account
                </p>
            </header>

            <form>
                <div className="mb-2.5">
                    <Label htmlFor="username">
                        Username
                    </Label>
                    <Input type="text" name="username" />
                </div>
                <div className="mb-2.5">
                    <Label htmlFor="email">
                        Email
                    </Label>
                    <Input type="email" name="email" />
                </div>
                <div className="mb-2.5">
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input type="password" name="password" />
                </div>
                <div className="mb-2 5">
                    <button className="w-full bg-blue-500 text-white text-sm border-none outline-none rounded-lg h-10 hover:bg-blue-400">
                        Create Account
                    </button>
                </div>
                <div className="mb-2 5">
                    <Link to="/auth/login" className="text-xs hover:text-blue-500">
                        Already have an account? Sign In.
                    </Link>
                </div>
            </form>

        </div>
    );
}

export default Register;
