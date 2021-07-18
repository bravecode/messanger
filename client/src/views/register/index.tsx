import React from 'react';
import { useDispatch } from 'react-redux';

import { clearErrors, registerRequest } from '_store/ducks/auth/actions';

import { Form, IRegisterData } from './components/Form';

const Register: React.FC = () => {
    const dispatch = useDispatch();

    // Handlers
    const handleSubmit = (data: IRegisterData) => {
        dispatch(registerRequest({
            username: data.username,
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
                    Sign Up 
                </h1>
                <p className="text-sm text-gray-400">
                    Create new Account
                </p>
            </header>

            <Form onSubmit={handleSubmit} onErrorsClear={handleErrorsClear} />

        </div>
    );
}

export default Register;
