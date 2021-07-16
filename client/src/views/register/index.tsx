import React from 'react';
import { Link } from 'react-router-dom';

import { Label } from '_components/form/Label';
import { Input } from '_components/form/Input';
import { register } from '_services/auth.service';
import { useForm } from '_helpers/useForm';
import { useDispatch } from 'react-redux';
import { registerRequest } from '_store/ducks/auth/actions';

export interface IRegisterData {
    username: string;
    email: string;
    password: string;
}

export const registerDataDefaults: IRegisterData  = {
    username: '',
    email: '',
    password: '',
}

const Register: React.FC = () => {
    const dispatch = useDispatch();

    const { data, onInputChange } = useForm<IRegisterData>({
        initialData: registerDataDefaults
    });

    // Handlers
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(registerRequest({
            username: data.username,
            email: data.email,
            password: data.password,
        }));

        // register(data.username, data.email, data.password)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log('Error');
        //         console.log(err.response.data);
        //         console.log(err.response.status);
        //         console.log(err.response.headers);
        //     });

        return;
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

            <form onSubmit={handleSubmit}>
                <div className="mb-2.5">
                    <Label htmlFor="username">
                        Username
                    </Label>
                    <Input type="text" name="username" onChange={onInputChange} />
                </div>
                <div className="mb-2.5">
                    <Label htmlFor="email">
                        Email
                    </Label>
                    <Input type="email" name="email" onChange={onInputChange} />
                </div>
                <div className="mb-2.5">
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input type="password" name="password" onChange={onInputChange} />
                </div>
                <div className="mb-2 5">
                    <button type="submit" className="w-full bg-blue-500 text-white text-sm border-none outline-none rounded-lg h-10 hover:bg-blue-400">
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
