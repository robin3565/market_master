import React, { useRef } from "react";
import { HOME_PATH } from "../../config/config_home";
import { requestStoreData } from "../../utils/requestList";

const DaeIn = () => {
  const introRef = useRef(null);
  const storesRef = useRef(null);

  // 특정 ID가 있는 위치로 스크롤 이동 함수
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const gwangju_store = requestStoreData("양동시장");

  return (
    <div>
      <div
        id="main"
        className="relative overflow-hidden bg-no-repeat bg-cover"
        style={{
          backgroundPosition: "50%",
          backgroundImage: "url('/img/market/old_대인시장_1.jpg')",
          height: "100vh",
        }}
      >
        <div
          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        >
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-white px-6 md:px-12">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-5 title_a">
                광주 대인시장
              </h1>
              <p className="text-2xl">100년 역사, 이야기 가득한 먹거리 시장</p>
            </div>
          </div>
        </div>
      </div>

      {/* 시장 소개 */}
      <div ref={introRef} className="py-20 md:py-20 mx-4 sm:mx-24">
        <div className="md:mx-80 m-0 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex md:flex-col flex-row mb-3">
            <p className="text-4xl font-bold mb-2 md:mr-0 mr-4 title_a">
              대인시장
            </p>
            <p>
              100년 역사,
              <br />
              이야기 가득한 먹거리 시장
            </p>
          </div>
          <div className="md:w-3/4 w-full leading-7 tracking-wide md:ml-4">
            <p className="mb-6">
              광주 양동시장은 광주와 전라남도에서 가장 큰 규모를 자랑하는
              전통시장으로 알려져 있다. 100년의 역사를 자랑하며, 광주의 명물이자
              호남 지역에서 가장 큰 재래시장이다.
            </p>
            <p className="mb-6">
              양동시장은 1910년부터 광주교 아래의 백사장에서 매달 2일과 7일에
              오일장이 열린 것으로 시작했다. 1940년에는 일본인들의 신사 주변
              정리 사업으로 인해 현재의 위치로 시장이 이전되었다. 이후 1946년
              동명 변경 과정에서 '어질 양(良), 골 동(洞), 어질게 살라는 뜻'에
              양동이라는 이름이 사용되기 시작했다.
            </p>
            <p className="mb-6">
              양동시장은 전국에서 소비되는 홍어의 90%가 거래되는 곳으로
              유명하며, 전국 우수시장으로 선정되어 있다. 약 300여 곳의 점포가
              4개 동으로 구성되어 있으며, 농산물, 수산물, 공산품 등 다양한
              품목을 취급한다.
            </p>
            <p className="mb-6">
              양동시장은 2000년대 현대화 과정을 통해 지붕 있는 깨끗한 시장으로
              탈바꿈했다. 또한 가격 정찰제를 통해 편리함도 더했다. 최근에는
              양동시장의 명물인 옛날 통닭과 맥주를 즐길 수 있는 ‘양동 통맥
              축제’를 열며 여전히 광주 시민들과 공존하는 모습을 보인다.
            </p>
            <p>
              양동시장은 전통적인 재래시장의 매력과 현대적인 시설과 경영
              시스템의 조화를 갖춘 멋진 시장으로, 광주 시민들과 방문객들에게
              사랑 받고 있다. 오늘도 양동시장은 활기를 띄며 사람 사는 이야기를
              쌓아 간다.
            </p>
          </div>
        </div>
        <div className="md:w-3/4 w-18/20 mx-auto flex flex-col md:flex-row justify-between mt-16">
          <div className="relative md:mx-4">
            <img
              src={`${HOME_PATH}/img/market/old_양동시장_1.jpg`}
              style={{ objectFit: "contain" }}
              alt="old_양동시장_1"
            />
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
              <p className="text-white text-xl font-bold">
                @광주 옛사진 - 양동시장
              </p>
            </div>
          </div>
          <div className="relative md:mx-4 ">
            <img
              src={`${HOME_PATH}/img/market/old_양동시장_2.jpg`}
              style={{ objectFit: "contain" }}
              alt="old_양동시장_2"
            />
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
              <p className="text-white text-xl font-bold">
                @광주 100년 사진 - 양동시장
              </p>
            </div>
          </div>
          <div className="relative md:mx-4">
            <img
              src={`${HOME_PATH}/img/market/old_양동시장_3.jpg`}
              style={{ objectFit: "contain" }}
              alt="old_양동시장_3"
            />
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
              <p className="text-white text-xl font-bold">
                @광주 100년 사진 - 양동 복개상가
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 시장 정보 */}
      <div ref={storesRef} className="bg-gray-100">
        {/* <div className="flex justify-center">
          <p className="text-3xl title_a my-16 font-bold">대표 먹거리</p>
        </div> */}
        <div className="md:py-20">
          <div className="mx-4 md:mx-48">
            {/*  01  */}
            <div className="flex flex-col md:flex-row justify-between md:mb-10 md:p-0 pt-10">
              <div className="w-full md:w-1/3">
                <p className="text-prigray-600">#양동시장 #통닭 #노포맛집</p>
                <p className="text-2xl font-semibold my-2">
                  추억을 간직한 맛, 양동 통닭집
                </p>
                <p className="leading-6 mt-5">
                  양동시장에는 옛날부터 생닭과 오리를 파는 가게들이 모여 길을
                  이루었는데, 이 길은 닭전머리길이라고 불렸다. 신선한 생닭을
                  가져다가 바로 튀겨 만든 옛날 통닭은 바삭한 식감과 고소한 맛,
                  그리고 닭똥집도 같이 튀겨주는 푸짐한 양 덕에 많은 시민들의
                  사랑을 받아왔다. 이젠 사라지고 있는 ‘옛날통닭’을 만나볼 수
                  있는 하나의 브랜드로 자리 잡으면서 누군가에게는 옛 향수를
                  불러일으키고, 누군가에게는 새로운 경험을 선사하기도 하며
                  시장의 문턱을 지키고 있다.
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center">
                {gwangju_store?.slice(0, 2)?.map((store, idx) => {
                  const name = store["점포명"];
                  const location = store["소재지도로명주소"];
                  return (
                    <div
                      className="border border-gray-200 w-full md:w-80 h-80 mx-2 md:mx-5 my-5 md:my-0 rounded-lg relative bg-no-repeat bg-cover"
                      key={idx}
                      style={{
                        backgroundImage: `url(${store.img_url})`,
                      }}
                    >
                      <div
                        className="rounded-lg absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                      >
                        <div className="p-4 text-white">
                          <p className="font-semibold text-2xl mb-2">{name}</p>
                          <p>{location}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/*  02  */}
            <div className="flex flex-col md:flex-row justify-between md:mb-10 md:p-0 pt-10">
              <div className="w-full md:w-1/3">
                <p className="text-prigray-600">#양동시장 #빵집 #소금빵</p>
                <p className="text-2xl font-semibold my-2">
                  소금빵 맛집, 양동시장 소금빵집
                </p>
                <p className="leading-6 mt-5">
                  양동시장에서 오래 전해져 내려오는 소금빵과 도너츠의 향기와
                  맛을 그대로 담았다. 소금빵은 기름기가 없고 소금으로 어우러진
                  부드러운 맛이 일품이다. 찹쌀 도너츠는 도너츠보단 도나쓰라는
                  발음이 더 어울리는, 맛이 보장되는 옛날 시장 도너츠다. 소금빵,
                  도너츠 모두 모양은 투박할지라도 그간의 전통을 지키며, 진리를
                  꿰뚫어 낸 맛을 선보인다.
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center">
                {gwangju_store?.slice(2, 4)?.map((store, idx) => {
                  const name = store["점포명"];
                  const location = store["소재지도로명주소"];
                  return (
                    <div
                      className="border border-gray-200 w-full md:w-80 h-80 mx-2 md:mx-5 my-5 md:my-0 rounded-lg relative bg-no-repeat bg-cover"
                      key={idx}
                      style={{
                        backgroundImage: `url(${store.img_url})`,
                      }}
                    >
                      <div
                        className="rounded-lg absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                      >
                        <div className="p-4 text-white">
                          <p className="font-semibold text-2xl mb-2">{name}</p>
                          <p>{location}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/*  03  */}
            <div className="flex flex-col md:flex-row justify-between md:mb-10 md:p-0 pt-10">
              <div className="w-full md:w-1/3">
                <p className="text-prigray-600">#양동시장 #가성비 #분식</p>
                <p className="text-2xl font-semibold my-2">
                  시장 인심이 가득한 노포 맛집
                </p>
                <p className="leading-6 mt-5">
                  오래된 노포 맛집은 전통적인 맛과 정서를 그대로 전해주는 곳이자
                  독특한 매력으로 많은 사람들에게 사랑받고 있다. 깊은 맛은 물론
                  오랜 세월 동안 전해져온 비법 레시피와 정성이 담겨있어, 한 그릇
                  음식만으로도 몸과 마음이 따뜻해지는 기분을 느낄 수 있다.
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center">
                {gwangju_store?.slice(4, 6)?.map((store, idx) => {
                  const name = store["점포명"];
                  const location = store["소재지도로명주소"];
                  return (
                    <div
                      className="border border-gray-200 w-full md:w-80 h-80 mx-2 md:mx-5 my-5 md:my-0 rounded-lg relative bg-no-repeat bg-cover"
                      key={idx}
                      style={{
                        backgroundImage: `url(${store.img_url})`,
                      }}
                    >
                      <div
                        className="rounded-lg absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                      >
                        <div className="p-4 text-white">
                          <p className="font-semibold text-2xl mb-2">{name}</p>
                          <p>{location}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/*  04  */}
            <div className="flex flex-col md:flex-row justify-between md:mb-10 md:p-0 pt-10">
              <div className="w-full md:w-1/3">
                <p className="text-prigray-600">#양동시장 #다양한 #반찬</p>
                <p className="text-2xl font-semibold my-2">
                  종류만 수 십 가지, 반찬 가게
                </p>
                <p className="leading-6 mt-5">
                  시장 한편에 늘어져 있는 반찬들은 참새가 방앗간 못 지나가듯
                  사람들의 발걸음을 멈추게 만든다. 언뜻 보아도 수 십 가지, 김치
                  종류만 열 다 가지가 넘는 반찬들 중 먹고 싶은 걸 고르다 보면
                  어느새 한 봉지 가득 담아 가게 된다. 맛이 보장되는 전라도
                  반찬들, 시장에서만 맛볼 수 있는 진한 젓갈과 반찬의 맛에 오늘도
                  반찬가게 앞엔 사람이 가득하다.
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center">
                {gwangju_store?.slice(6, 8)?.map((store, idx) => {
                  const name = store["점포명"];
                  const location = store["소재지도로명주소"];
                  return (
                    <div
                      className="border border-gray-200 w-full md:w-80 h-80 mx-2 md:mx-5 my-5 md:my-0 rounded-lg relative bg-no-repeat bg-cover"
                      key={idx}
                      style={{
                        backgroundImage: `url(${store.img_url})`,
                      }}
                    >
                      <div
                        className="rounded-lg absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                      >
                        <div className="p-4 text-white">
                          <p className="font-semibold text-2xl mb-2">{name}</p>
                          <p>{location}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 스크롤 이동 버튼 */}
      <div className="fixed bottom-0 right-0 m-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded mr-2 shadow-md"
          onClick={() => scrollToSection(introRef)}
        >
          시장 소개
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded shadow-md"
          onClick={() => scrollToSection(storesRef)}
        >
          시장 정보
        </button>
      </div>
    </div>
  );
};

export default DaeIn;
