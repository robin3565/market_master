import React, { useState } from "react";
import useInputs from "../../hooks/useInputs";
import { requestFindId, requestForgetId } from "../../utils/requestList";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const FindId = () => {
  const [{ email, verified }, handleInputChange] = useInputs({
    email: "",
    verified: "",
  });

  const [verifiedNum, setVerifiedNum] = useState("");
  const [view, setView] = useState(false);
  const [findIdRes, setFindIdRes] = useState("");
  const [finded, setFinded] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  };

  const handleFindId = async () => {
    const isValidEmail = validateEmail(email);
    if (isValidEmail) {
      setView(true);
      const email_ = email.trim();
      const res = await requestForgetId({
        mem_email: email_,
      });
      if (res.result === "success") {
        setVerifiedNum(res.numbers);
        toast.success("인증번호가 이메일로 발송되었습니다.")
      } else {
        toast.error("이메일을 다시 확인해주세요.");
        return;
      }
    } else {
      setView(false);
      toast.error("이메일 형식을 확인해주세요.");
      return;
    }
  };

  // 인증번호 확인
  const handleVerify = async () => {
    if (verified.length === 0 || verified.trim().length === 0) {
      toast.error("인증번호를 입력해주세요.");
      return false;
    }

    if (verifiedNum === verified) {
      const email_ = email.trim();
      const findedId = await requestFindId({
        mem_email: email_,
      });
      if (findedId.result === "success") {
        setFindIdRes(findedId?.findId?.mem_id);
        setFinded(true);
      } else {
        toast.error(
          "아이디를 찾는 데 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    }
  };
  return (
    <div className="md:w-1/3 lg:w-1/4 w-full flex flex-col md:py-24 py-8 h-screen">
      <div className="flex items-center justify-center mb-5">
        <h3 className="font-bold text-3xl">아이디 찾기</h3>
      </div>
      <div
        className="w-full bg-white rounded-lg shadow-lg 
      dark:border md:mt-0 xl:p-0 dark:bg-gray-800 
      dark:border-gray-700"
      >
        {" "}
        {finded ? (
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center items-center flex-col">
              <p className="font-semibold text-2xl mb-2">아이디</p>
              <p className="text-xl">{findIdRes}</p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <Link to="/login" className="font-semibold text-primary-500 mb-2">
                로그인
              </Link>
              <Link to="/forgot" className="font-semibold text-primary-500">
                비밀번호 찾기
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center items-center flex-col">
              <p>아이디를 찾을 수 있는</p>
              <p>인증번호를 이메일로 보내드려요.</p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div>
                <div className="mt-1">
                  <input
                    placeholder="이메일 (가입한 이메일 주소를 입력해주세요.)"
                    name="email"
                    className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={email}
                    disabled={view}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {view && (
                <div>
                  <div className="mt-1">
                    <input
                      placeholder="인증번호"
                      name="verified"
                      className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={verified}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              {!view && (
                <button
                  type="button"
                  onClick={handleFindId}
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-3
                   font-semibold leading-6 text-white shadow-sm hover:bg-blue-500
                    focus-visible:outline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-prigray-400"
                >
                  인증번호 발송
                </button>
              )}
              {view && (
                <button
                  type="button"
                  onClick={handleVerify}
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-3
                   font-semibold leading-6 text-white shadow-sm hover:bg-blue-500
                    focus-visible:outline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-prigray-400"
                >
                  인증번호 확인
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindId;
