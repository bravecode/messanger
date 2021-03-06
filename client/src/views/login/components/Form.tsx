import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Input } from "_components/form/Input";
import { Label } from "_components/form/Label";
import { Alert } from "_components/alert/Alert";
import { useForm } from "_helpers/useForm";
import { IStore } from "_store";
import { Spinner } from "_components/spinner/Spinner";

export interface ILoginData {
    email: string;
    password: string;
}

export const registerDataDefaults: ILoginData  = {
    email: '',
    password: '',
}

export interface IFormProps {
    onSubmit: (data: ILoginData) => void;
    onErrorsClear: () => void;
}

const Form: React.FC<IFormProps> = ({
    onSubmit,
    onErrorsClear
}) => {
    const { data, onInputChange } = useForm<ILoginData>({
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
                <Label htmlFor="email">
                    Email
                </Label>
                <Input type="email" name="email" onChange={onInputChange} value={data.email} />
            </div>
            <div className="mb-2.5">
                <Label htmlFor="password">
                    Password
                </Label>
                <Input type="password" name="password" onChange={onInputChange} value={data.password} />
            </div>
            <div className="mb-2 5">
                <button className="w-full bg-purple-500 text-white text-sm border-none outline-none rounded-lg h-10 hover:bg-purple-400">
                    { pending ? <Spinner className="w-full text-white" /> : <>Login</> }
                </button>
            </div>
            <div className="mb-2 5">
                <Link to="/auth/register" className="text-xs hover:text-purple-500" onClick={onErrorsClear}>
                    Don't have an account? Sign Up.
                </Link>
            </div>
        </form>
    );
}

export { Form }
