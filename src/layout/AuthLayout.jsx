import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../atoms/Logo";

const AuthLayout = ({ login }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(login) {
      navigate("/")
    }
  })
  return (
    <div className="bg-gray-50 h-full">
      <header
        className="flex justify-between 
      max-w-screen-xl flex-wrap items-center mx-auto"
      >
        <div className="p-5 grow">
          <Logo />
        </div>
      </header>
      <section className="w-full h-full mx-auto dark:bg-gray-900 flex flex-col md:p-0 px-6 items-center">
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;
