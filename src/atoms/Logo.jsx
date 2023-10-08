import React from "react";
import { HOME_PATH } from "../config/config_home";

const Logo = ({ size = "normal" }) => {
  return (
    <a href="/" className="flex items-center">
      {/* <img
        src={`${HOME_PATH}/img/market.png`}
        className="h-8 mr-3"
        alt="Logo"
      /> */}
      <span
        className={`${
          size == "big" ? "text-4xl" : "text-2xl"
        } self-center  font-bold whitespace-nowrap dark:text-white title_a`}
      >
        시장275
      </span>
    </a>
  );
};

export default Logo;
