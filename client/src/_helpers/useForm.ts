import React, { useState } from 'react';

export interface IUseFormProps<T> {
    initialData: T;
}

export interface IUseFormResult<T> {
    data: T;
    onInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

function useForm<T> ({
    initialData
}: IUseFormProps<T>): IUseFormResult<T> {
    const [data, setData] = useState<T>(initialData);
    
    // Handlers
    const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        if (!Object.keys(initialData).includes(name)) {
            console.log('useForm error goes here');

            return;
        }

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    return {
        data,
        onInputChange
    }
}

export { useForm }