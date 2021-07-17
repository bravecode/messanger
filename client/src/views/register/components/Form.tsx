import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input } from '_components/form/Input';
import { Label } from '_components/form/Label';
import { useForm } from '_helpers/useForm';
import { IStore } from '_store';

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

export interface IFormProps {
    onSubmit: (data: IRegisterData) => void;
}

const Form: React.FC<IFormProps> = ({
    onSubmit
}) => {
    const { data, onInputChange } = useForm<IRegisterData>({
        initialData: registerDataDefaults
    });

    // Store
    const { pending } = useSelector((store: IStore) => store.auth);

    // Handlers
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit(data);
    }

    return (
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
                    {
                        pending ? <div>Loading</div> : <span>Create Account</span>
                    }
                </button>
            </div>
            <div className="mb-2 5">
                <Link to="/auth/login" className="text-xs hover:text-blue-500">
                    Already have an account? Sign In.
                </Link>
            </div>
        </form>
    );
}

export { Form }
