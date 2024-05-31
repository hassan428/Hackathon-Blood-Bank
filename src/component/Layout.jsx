import React from "react";
import { Navbar } from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const Layout = () => {
  const store = useSelector((store) => store);
  const { userLogged, theme } = store
  // console.log(theme)
  const bgColor = theme.theme == "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-black";

  return (

    userLogged.loginSuccess == false ? <Navigate to={"/"} /> :
      <>
        <div className={`min-h-screen ${bgColor}`}>
          <Navbar />
          <Outlet />
        </div>
      </>

  );
};
