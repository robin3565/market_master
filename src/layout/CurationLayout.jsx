import React, { useEffect } from "react";
import Navbar from "../organisms/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const CurationLayout = ({ login }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname?.split("/")[1];

  useEffect(() => {
    if (path === "mypage") {
      const loginStatus = sessionStorage.getItem("login_status");
      if (loginStatus !== "Y") {
        navigate("/");
      }
    }
  }, [location.pathname]);

  return (
    <div>
      <Navbar login={login} />
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default CurationLayout;
