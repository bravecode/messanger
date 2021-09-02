import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logoutRequest } from '_store/ducks/auth/actions';
import { disconnectRequest } from '_store/ducks/socket/actions';

const Logout: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutRequest());
        dispatch(disconnectRequest());
    }, [dispatch]);

    return (
        <Redirect to="/auth/login" />
    );
}

export default Logout;