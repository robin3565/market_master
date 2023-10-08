import React from "react";
import { Link } from "react-router-dom";

const Curation = () => {
  return (
    <div className="py-20">
      {/* 큐레이션 미리보기 */}
      <div className="w-full mb-10">
        <div className="mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="">
            {/* 큐레이션 아이템 01 */}
            <Link to="/curation/gwangju">
              <div className="mt-8 text-white transition ">
                <div
                  className="relative overflow-hidden bg-no-repeat bg-cover"
                  style={{
                    backgroundPosition: "50%",
                    backgroundImage: "url('/img/gwangju.jpg')",
                    height: "300px",
                  }}
                >
                  <div
                    className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black/25 hover:bg-black/50 transition"
                  >
                    <div className="flex justify-center items-center h-full">
                      <div className="text-center px-6 md:px-12">
                        <div className="title_a">
                          <p className="text-3xl md:text-4xl font-bold tracking-tight mb-2.5">
                            6월의 시장
                          </p>
                          <p className="text-5xl md:text-6xl font-bold tracking-tight">
                            광주
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            {/* 큐레이션 아이템 02 */}
            <div className="mt-10">
              <div
                className="relative overflow-hidden bg-no-repeat bg-cover"
                style={{
                  backgroundPosition: "50%",
                  backgroundImage: "url('/img/busan.jpg')",
                  height: "300px",
                }}
              >
                <div
                  className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
                >
                  <div className="flex justify-center items-center h-full">
                    <div className="text-center text-white px-6 md:px-12">
                      <div className="title_a">
                        <p className="text-3xl md:text-4xl font-bold tracking-tight mb-2.5">
                          7월의 시장
                        </p>
                        <p className="text-5xl md:text-6xl font-bold tracking-tight">
                          coming soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curation;
