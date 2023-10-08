import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MapLayout from "../layout/MapLayout";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import {
  Home,
  Map,
  Geo,
  Market,
  Yangdong,
  Curation,
  Forgot,
  Login,
  Signup,
  Gwangju,
  Malbau,
  FindId,
  DaeIn,
} from "../pages";
import CurationLayout from "../layout/CurationLayout";
import Mypage from "../pages/auth/Mypage";
import Profile from "../pages/auth/Profile";

const Routers = ({ mapInit, saveMapInit, myLocation }) => {
  const [login, setLogin] = useState(false);
  const location = useLocation();

  const checkAuthentication = () => {
    // const accessToken = sessionStorage.getItem("access_token");
    // const refreshToken = sessionStorage.getItem("refresh_token");
    const loginStatus = sessionStorage.getItem("login_status");

    if (loginStatus === "Y") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const authentication = checkAuthentication();
    setLogin(authentication);
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<AuthLayout login={login} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/findId" element={<FindId />} />
      </Route>
      <Route element={<MainLayout login={login} />}>
        <Route path="/" element={<Home />} />
        <Route path="/curation" element={<Curation />} />
      </Route>
      <Route element={<CurationLayout login={login} />}>
        <Route path="/curation/yangdong" element={<Yangdong />} />
        <Route path="/curation/malbau" element={<Malbau />} />
        <Route path="/curation/daein" element={<DaeIn />} />
        <Route path="/curation/gwangju" element={<Gwangju />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/profile" element={<Profile />} />
      </Route>
      <Route
        element={
          <MapLayout
            saveMapInit={saveMapInit}
            mapInit={mapInit}
            myLocation={myLocation}
            login={login}
          />
        }
      >
        <Route path="/map" element={<Map mapInit={mapInit} />} />
        <Route path="/map/:id" element={<Geo mapInit={mapInit} />} />
        <Route path="/map/market/:id" element={<Market mapInit={mapInit} />} />
      </Route>
    </Routes>
  );
};

export default Routers;
