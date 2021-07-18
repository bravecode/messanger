import React from 'react';
import { useDispatch } from 'react-redux';

import { clearErrors, loginRequest } from '_store/ducks/auth/actions';

import { Form, ILoginData } from './components/Form';

const Login: React.FC = () => {
    const dispatch = useDispatch();

    // Handlers
    const handleSubmit = (data: ILoginData) => {
        dispatch(loginRequest({
            email: data.email,
            password: data.password,
        }));

        return;
    }

    const handleErrorsClear = () => {
        dispatch(clearErrors());
    }

    return (
        <div className="grid justify-center">
            
            <header className="mb-5">
                <h1 className="text-xl mb-1">
                    Sign In
                </h1>
                <p className="text-sm text-gray-400">
                    Access your account
                </p>
            </header>

            <Form onSubmit={handleSubmit} onErrorsClear={handleErrorsClear} />

        </div>
    );
}

export default Login;
