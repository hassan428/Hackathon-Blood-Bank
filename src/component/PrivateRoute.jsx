import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {

    const store = useSelector((store) => store.logged);
    // console.log(store.logged)

    return (
        store.logged == true ? <Navigate to={"/Home"} /> : <Outlet />
    )
}
