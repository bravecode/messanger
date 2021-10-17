import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert } from '_components/alert/Alert';
import { Input } from '_components/form/Input';
import { Label } from '_components/form/Label';
import { Spinner } from '_components/spinner/Spinner';
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
    onErrorsClear: () => void;
}

const Form: React.FC<IFormProps> = ({
    onSubmit,
    onErrorsClear
}) => {
    const { data, onInputChange } = useForm<IRegisterData>({
        initialData: registerDataDefaults
    });

    // Store
    const { pending, errors } = useSelector((store: IStore) => store.auth);

    // Handlers
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                !!errors?.length && (
                    <div className="mb-2.5">
                        <Alert
                            title="Oops!"
                            content={errors}
                        />
                    </div>
                )
            }
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
                <button type="submit" className="w-full bg-purple-500 text-white text-sm border-none outline-none rounded-lg h-10 hover:bg-purple-400">
                    { pending ? <Spinner className="w-full text-white" /> : <>Create Account</> }
                </button>
            </div>
            <div className="mb-2 5">
                <Link to="/auth/login" className="text-xs hover:text-purple-500" onClick={onErrorsClear}>
                    Already have an account? Sign In.
                </Link>
            </div>
        </form>
    );
}

export { Form }
