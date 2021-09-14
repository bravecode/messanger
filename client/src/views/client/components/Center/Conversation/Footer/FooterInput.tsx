import React from 'react';
import { IoSend } from 'react-icons/io5';

import { useForm } from '_helpers/useForm';

export interface IFooterInputValues {
    value: string;
}

const FooterInput: React.FC = () => {
    const { data, onInputChange, onInputValueSet } = useForm<IFooterInputValues>({
        initialData: {
            value: ''
        }
    });

    // Handlers
    const handleSubmit = () => {
        console.log(data.value);

        onInputValueSet('value', '');
    }

    return (
        <form className="h-10 w-full relative">
            {
                !!data.value && (
                    <button className="text-purple-500 absolute top-0 right-0 h-10 w-10 flex items-center justify-center" onClick={handleSubmit} type="submit">
                        <IoSend size="14px" color="inherit" />
                    </button>
                )
            }

            <input 
                type="text"
                className="h-full w-full bg-custom-gray-lightest rounded-md text-sm px-2.5 focus:outline-none border-2 border-transparent focus:border-custom-gray-light"
                name="value"
                value={data.value}
                onChange={onInputChange}    
            />
        </form>
    );
}

export { FooterInput }