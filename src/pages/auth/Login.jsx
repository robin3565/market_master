import React, { useEffect, useState } from "react";
import useInputs from "../../hooks/useInputs";
import useCheckbox from "../../hooks/useCheckbox";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  checkKakaoDuplicate,
  checkKakaoSignup,
  postLogin,
} from "../../utils/requestList";

const Login = () => {
  const navigate = useNavigate();
  const [viewStep, setViewStep] = useState({ first: true, second: false });
  const [kakaoSignUp, setKakaoSignUp] = useState(false);
  const [inputs, handleInputChange] = useInputs({
    id: "",
    password: "",
  });
  const [
    { check_all, terms, privacy, subscribe },
    handleCheckboxChange,
    handleCheckAllChange,
  ] = useCheckbox({
    check_all: false,
    terms: false,
    privacy: false,
    subscribe: false,
  });
  const [kakao_account, setKakao_account] = useState({});
  const [auth_object, setAuth_Object] = useState({});

  const [accountInfo, setAccountInfo] = useState({
    id: "",
    nickname: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id_ = inputs.id.trim();
    const password_ = inputs.password.trim();

    const param = {
      mem_id: id_,
      mem_pw: password_,
    };

    const res = await postLogin(param);
    if (res?.result === "success") {
      sessionStorage.setItem("login_status", "Y");
      sessionStorage.setItem("id", id_);
      toast.success("로그인 되었습니다.");
      navigate("/");
    } else {
      toast.error("로그인에 실패했습니다. 아이디, 비밀번호를 확인해주세요.");
    }
  };

  useEffect(() => {
    // 카카오 SDK 초기화
    window.Kakao.init("e8d84f0e5816b2d9fbc108e4c4caf46a");
  }, []);

  const handleKakaoLogin = () => {
    setViewStep({ first: true, second: false });
    // 카카오 로그인 처리
    window.Kakao.Auth.login({
      success: (authObj) => {
        // console.log("카카오 로그인 성공:", authObj);
        setAuth_Object(authObj);

        // 사용자 정보 가져오기
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: async (response) => {
            // console.log("카카오 사용자 정보:", response);

            // 카카오 정보 확인
            const kakaoRes = await checkKakaoDuplicate(response);
            const isDuplicated = kakaoRes?.result;

            if (isDuplicated === "none") {
              setAccountInfo({
                ...accountInfo,
                id: response?.kakao_account?.email,
                nickname: response?.kakao_account?.email?.split("@")[0] || "",
              });
              setKakao_account(response);
              setKakaoSignUp(true);
              setViewStep({ first: false, second: true });
            } else if (isDuplicated === "duplicate") {
              sessionStorage.setItem("login_status", "Y");
              // sessionStorage.setItem("id", response?.kakao_account?.email);
              // sessionStorage.setItem("nickname", accountInfo.nickname);
              toast.success("로그인 되었습니다.");
              navigate("/");
            } else {
              toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
            }
          },
          fail: (error) => {
            console.error("카카오 사용자 정보 가져오기 실패:", error);
            // 실패 시 처리할 로직을 여기에 작성합니다.
          },
        });
      },
      fail: (err) => {
        console.error("카카오 로그인 실패:", err);
        // 로그인 실패 시 처리할 로직을 여기에 작성합니다.
      },
      scope:
        "profile_nickname, profile_image, account_email, gender, age_range, birthday",
    });
  };

  const isValidationTrue = check_all || (terms && privacy);

  const handleLastLogin = async () => {
    if (isValidationTrue && kakaoSignUp) {
      const kakaoResult = await checkKakaoSignup(kakao_account);
      if (kakaoResult?.result === "success") {
        sessionStorage.setItem("access_token", auth_object?.access_token);
        sessionStorage.setItem("refresh_token", auth_object?.refresh_token);
        sessionStorage.setItem("id", accountInfo.id);
        sessionStorage.setItem("nickname", accountInfo.nickname);
        sessionStorage.setItem("login_status", "Y");
        navigate("/");
        toast.success("로그인 되었습니다.");
      } else {
        toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      toast.error("필수 약관에 동의해주세요!");
      return;
    }
  };

  return (
    <>
      {/* Component 01 */}
      {viewStep.first && (
        <div className="md:w-1/3 lg:w-1/4 w-full flex-col h-screen md:py-24 py-8">
          <div className="w-full flex-col">
            <div className="flex items-center justify-center mb-5">
              <h3 className="font-bold text-3xl">로그인</h3>
            </div>

            <div
              className="w-full bg-white rounded-lg shadow-lg 
            dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 
            dark:border-gray-700"
            >
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="flex items-center justify-center w-full mb-5 h-12 rounded-lg bg-kakao font-semibold">
                  <button className="w-full" onClick={handleKakaoLogin}>
                    카카오로 시작하기
                  </button>
                </div>

                <div className="h-0.5">
                  <div className="bg-prigray-300 h-full"></div>
                </div>

                <div className="mt-6">
                  <form
                    className="space-y-6"
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <div className="mt-2">
                        <input
                          id="id"
                          name="id"
                          type="id"
                          value={inputs.id}
                          autoComplete="id"
                          placeholder="아이디"
                          required
                          className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          placeholder="비밀번호"
                          required
                          value={inputs.password}
                          className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="">
                          <a href="/forgot" className="font-semibold underline">
                            비밀번호를 잊으셨나요?
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-primary-500 px-3 py-3
                   font-semibold leading-6 text-white shadow-sm hover:bg-primary-400
                    focus-visible:outline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                      >
                        로그인
                      </button>
                    </div>
                  </form>
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <a
                      href="/signup"
                      className="mb-1.5 font-semibold underline flex items-center justify-center"
                    >
                      회원가입하기
                    </a>
                    <a
                      href="/findId"
                      className="font-semibold underline flex items-center justify-center"
                    >
                      아이디 찾기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Component 02 */}
      {viewStep?.second && (
        <div className="md:w-1/3 lg:w-1/4 w-full flex-col h-screen md:py-24 py-8">
          <div className="w-full flex-col">
            <div className="flex items-center justify-center mb-5">
              <h3 className="font-bold text-3xl">회원가입</h3>
            </div>

            <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div>
                  <div className="mt-2">
                    <input
                      id="id"
                      name="id"
                      type="text"
                      disabled={true}
                      value={accountInfo.id}
                      className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      id="nickname"
                      name="nickname"
                      type="text"
                      value={accountInfo.nickname}
                      autoComplete="nickname"
                      placeholder="닉네임"
                      required
                      className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) =>
                        setAccountInfo({
                          ...accountInfo,
                          nickname: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* 동의하기 */}
                <div className="mt-5">
                  <div className="py-0.5">
                    <input
                      type="checkbox"
                      id="check_all"
                      name="check_all"
                      checked={check_all}
                      className="accent-blue-600"
                      onChange={handleCheckAllChange}
                    />
                    <label htmlFor="check_all" className="ml-1.5">
                      모두 동의합니다
                    </label>
                  </div>
                  <div className="py-0.5">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={terms}
                      className="accent-blue-600"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms" className="ml-1.5">
                      이용약관 동의 (필수)
                    </label>
                  </div>
                  <div className="py-0.5">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacy"
                      checked={privacy}
                      className="accent-blue-600"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="privacy" className="ml-1.5">
                      개인정보 수집/이용 동의 (필수)
                    </label>
                  </div>
                  <div className="py-0.5">
                    <input
                      type="checkbox"
                      id="subscribe"
                      name="subscribe"
                      checked={subscribe}
                      className="accent-blue-600"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="subscribe" className="ml-1.5">
                      뉴스레터 및 마케팅 정보 수신 동의 (선택)
                    </label>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    disabled={!isValidationTrue}
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-3
                   font-semibold leading-6 text-white shadow-sm hover:bg-blue-500
                    focus-visible:outline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-prigray-400"
                    onClick={handleLastLogin}
                  >
                    가입하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
