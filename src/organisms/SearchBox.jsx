import React, { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import { getSearchData, naverSearchData } from "../utils/requestList";
import { throttle } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "../atoms/SearchIcon";
import { HOME_PATH } from "../config/config_home";

const SearchBox = ({ mapInit }) => {
  const { naver } = window;
  const { value, handleChange, handleKeyDown } = useInput("");

  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    setSearchResults([]);
    setSelectedResult(false);

    window.addEventListener("hashchange", handleClick);

    return () => {
      window.removeEventListener("hashchange", handleClick);
    };
  }, [location]);

  const moveToMarket = (item, map) => {
    const latitude = item.latitude;
    const longitude = item.longitude;
    const mapLatLng = new naver.maps.LatLng(
      Number(latitude),
      Number(longitude)
    );

    map.panTo(mapLatLng);
  };

  const handleSearch = throttle(async (name) => {
    const searched = await getSearchData(name);
    if(searched.length > 0) {
      setSearchResults(searched);
    } else {
      setSearchResults([]);
    }
  }, 300);

  useEffect(() => {
    if(!value || value.length < 2) {
      setSearchResults([]);
      return;
    }

    if (value) {
      if (value.length > 1) {
        handleSearch(value);
      }
    }
  }, [value]);

  const handleEnterKey = async () => {
    if (searchResults?.length > 0) {
      const item = searchResults[0];
      setSelectedResult(item);

      moveToMarket(item, mapInit);
      const uid = item.uid;
      const name = item.market_name;
      const markerData = await naverSearchData(name);
      navigate(`/map/market/${uid}`, {
        state: { data: item, markerData: markerData },
      });
    }
  };

  return (
    <form className="p-4 flex flex-col">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 
        sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
        <SearchIcon />
          <button
            className="w-10 h-10 md:hidden block"
            type="button"
            onClick={() => {
              navigate('/map');
            }}
          >
            <img
              className="w-5 h-5"
              src={`${HOME_PATH}/img/back_gray_60.png`}
            />
          </button>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-3 pl-10 text-gray-900 border border-gray-300 rounded-lg 
                bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="시장이름 또는 시도군을 검색해보세요!"
          required
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown(handleEnterKey)}
          style={{ flex: "1" }}
        />
      </div>
      {(value && searchResults.length === 0) && (
        <div className="px-4 pt-1 border bg-white z-50 w-full">
          <p className="my-2">검색결과가 없습니다.</p>
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="px-4 pt-1 border bg-white z-50 w-full">
          <ul>
            {searchResults?.slice(0, 6).map((item) => {
              return (
                <div
                  key={item.id}
                  className={`cursor-pointer ${
                    selectedResult === item ? "bg-gray-200" : ""
                  }`}
                  onClick={async () => {
                    moveToMarket(item, mapInit);
                    setSelectedResult(item);
                    const uid = item.market_uid;
                    const name = item.market_name;
                    const markerData = await naverSearchData(name);
                    navigate(`/map/market/${uid}`, {
                      state: { data: item, markerData: markerData },
                    });
                  }}
                >
                  <p className="my-2">{item.market_name}</p>
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SearchBox;
