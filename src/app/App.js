import { BrowserRouter } from "react-router-dom";
import Routers from "./Routers";
import { useEffect, useState } from "react";
import ScrollToTop from "../utils/ScrollToTop";
import { Toaster } from "react-hot-toast";
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

function App() {
  const [mapInit, setMapInit] = useState(null);
  const [myLocation, setMyLocation] = useState({ latitude: 37.5656, longitude: 126.9769 });
  const [pos, setPos] = useState("top-center");

  // useEffect(() => {
  //   NProgress.start(); // 컴포넌트 마운트 시 NProgress 시작

  //   return () => {
  //     NProgress.done(); // 컴포넌트 언마운트 시 NProgress 완료
  //   };
  // }, []);

  // useEffect(() => {
  //   const getMyPosition = () => {
  //     if (navigator.geolocation) {
  //       return new Promise((resolve, reject) => {
  //         navigator.geolocation.getCurrentPosition(
  //           (position) => {
  //             const { latitude, longitude } = position.coords;
  //             const res = { latitude, longitude };
  //             setMyLocation({ ...res });
  //             resolve(res);
  //           },
  //           (error) => {
  //             console.error(error);
  //             const defaultLocation = {
  //               latitude: 37.4979517,
  //               longitude: 127.0276188,
  //             };
  //             setMyLocation(defaultLocation);
  //             reject(defaultLocation);
  //           }
  //         );
  //       });
  //     }

  //     const defaultLocation = { latitude: 37.4979517, longitude: 127.0276188 };
  //     setMyLocation(defaultLocation);
  //     return Promise.reject(defaultLocation);
  //   };

  //   const initializPosition = async () => {
  //     // Get current position
  //     let myPosition;
  //     try {
  //       myPosition = await getMyPosition();
  //     } catch (error) {
  //       console.error(error);
  //       myPosition = { latitude: 37.5656, longitude: 126.9769 };
  //     }
  //   };

  //   initializPosition();
  // }, []);

  const saveMapInit = (map) => {
    setMapInit(map);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster
        position={pos}
        reverseOrder={false}
        gutter={8}
        containerClassName="toast_web"
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            backgroundColor: "rgba(82, 82, 91, 0.9)",
            color: "white",
            borderRadius: "20px",
          },
          success: {
            style: {},
          },
          error: {
            style: {},
          },
        }}
      />
      <Routers
        mapInit={mapInit}
        saveMapInit={saveMapInit}
        myLocation={myLocation}
      />
    </BrowserRouter>
  );
}

export default App;
