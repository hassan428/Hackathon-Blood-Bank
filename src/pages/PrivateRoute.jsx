import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {

    const store = useSelector((store) => store.userLogged);
    const { loginSuccess } = store


    return (
        loginSuccess == true ? <Navigate to={"/home"} /> : <Outlet />
    )
}
