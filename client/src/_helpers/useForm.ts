import React, { useState } from 'react';

export interface IUseFormProps<T> {
    initialData: T;
}

export interface IUseFormResult<T> {
    data: T;
    onInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
    onInputValueSet: (name: string, value: string) => void;
}

function useForm<T> ({
    initialData
}: IUseFormProps<T>): IUseFormResult<T> {
    const [data, setData] = useState<T>(initialData);

    // Handlers
    const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        if (!isFieldHere(name)) return;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const onInputValueSet = (name: string, value: string) => {
        if (!isFieldHere(name)) return;
        
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    // Helpers
    const isFieldHere = (name: string) => {
        if (!Object.keys(initialData).includes(name)) {
            console.log(`[useForm] Field "${name}" was not specified.`);

            return false;
        }

        return true;
    }

    return {
        data,
        onInputChange,
        onInputValueSet
    }
}

export { useForm }