import React, { useEffect, useState } from "react";
import useCheckbox from "../../hooks/useCheckbox";
import { useForm } from "react-hook-form";
import { checkDuplicateId, postSignup } from "../../utils/requestList";
import { toast } from "react-hot-toast";
import { throttle } from "lodash";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    watch,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isDirty, errors },
  } = useForm();
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
  const [isDuplicate, setDuplicate] = useState(false);
  const navigate = useNavigate();

  const isValidationTrue =
    (check_all && !isDuplicate) || (terms && privacy && !isDuplicate);

  const onSubmit = async (data, e) => {
    // 비밀번호 확인
    if (data.password !== data.password_confirm) {
      setError(
        "password_confirm",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
      return false;
    }

    // 아이디 중복 확인
    const isDuplicate = await checkDuplicateId({
      mem_id: data.id,
    });
    if (isDuplicate === "duplicate") {
      setError(
        "id",
        {
          message: "중복된 계정이 있습니다.",
        },
        { shouldFocus: true }
      );
      return false;
    }

    // 이메일 중복 확인
    const isDuplicateEmail = await checkDuplicateId({
      mem_email: data.email,
    });
    if (isDuplicateEmail === "duplicate") {
      setError(
        "email",
        {
          message: "중복된 이메일이 있습니다.",
        },
        { shouldFocus: true }
      );
      return false;
    }

    const id_ = data.id.trim();
    const password_ = data.password.trim();
    const email_ = data.email.trim();
    const nickname_ = data.nickname.trim();
    const marketing_flag = subscribe === true ? "Y" : "N";

    const param = {
      mem_id: id_,
      mem_pw: password_,
      mem_email: email_,
      mem_name: nickname_,
      marketing_flag: marketing_flag,
    };

    const res = await postSignup(param);
    if (res?.result === "success") {
      toast.success("회원가입 완료!");
      navigate('/login')
    } else {
      toast.error("회원가입에 실패하였습니다. 다시 시도해주세요.");
    }
  };
  const onError = (errors, e) => console.log(errors, e);

  const handleIdChange = throttle(async (id) => {
    if (id) {
      const id_ = id.trim();
      clearErrors("id");
      const res = await checkDuplicateId({
        mem_id: id_,
      });
      if (res === "duplicate") {
        setDuplicate(true);
        setError(
          "id",
          {
            message: "중복된 계정이 있습니다.",
          },
          { shouldFocus: true }
        );
      } else if (res === "none") {
        setDuplicate(false);
      }
    }
  }, 300);

  const handleEmailChange = throttle(async (email) => {
    if (email) {
      const email_ = email.trim();
      clearErrors("email");
      const res = await checkDuplicateId({
        mem_email: email_,
      });
      if (res === "duplicate") {
        setDuplicate(true);
        setError(
          "email",
          {
            message: "중복된 이메일이 있습니다.",
          },
          { shouldFocus: true }
        );
      } else if (res === "none") {
        setDuplicate(false);
      }
    }
  }, 300);

  useEffect(() => {
    // id 필드의 값 변경 감지
    const id = watch("id");
    handleIdChange(id);
  }, [watch("id")]);

  useEffect(() => {
    const email = watch("email");
    handleEmailChange(email);
  }, [watch("email")]);

  return (
    <div className="w-full h-screen flex flex-col items-center mx-auto md:my-24 my-8">
      <div className="flex items-center justify-center mb-5">
        {/* <Logo size={"big"} /> */}
        <h3 className="font-bold text-3xl">회원가입</h3>
      </div>
      <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div>
              <div className="mt-1">
                <input
                  id="id"
                  name="id"
                  type="id"
                  autoComplete="id"
                  placeholder="아이디"
                  onChange={handleIdChange}
                  aria-invalid={
                    !isDirty ? undefined : errors.id ? "true" : "false"
                  }
                  className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("id", {
                    required: "아이디는 필수 입력입니다.",
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "아이디는 영문자와 숫자로만 이루어져야 합니다.",
                    },
                    pattern: {
                      value: /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/,
                      message: "아이디는 반드시 영문자를 포함해야 합니다.",
                    },
                    minLength: {
                      value: 5,
                      message: "아이디는 5자리 이상 입력해주세요.",
                    },
                  })}
                />
                {errors.id && (
                  <small className="text-primary-500" role="alert">
                    {errors.id.message}
                  </small>
                )}
              </div>
            </div>

            <div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="비밀번호 (8자 이상)"
                  aria-invalid={
                    !isDirty ? undefined : errors.password ? "true" : "false"
                  }
                  className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", {
                    required: "비밀번호는 필수 입력입니다.",
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/,
                      message:
                        "비밀번호는 영문자와 숫자를 반드시 포함해야합니다.",
                    },
                    minLength: {
                      value: 8,
                      message: "비밀번호는 8자리 이상 입력해주세요.",
                    },
                  })}
                />
                {errors.password && (
                  <small className="text-primary-500" role="alert">
                    {errors.password.message}
                  </small>
                )}
              </div>
            </div>
            <div>
              <div className="mt-1">
                <input
                  id="password_confirm"
                  name="password_confirm"
                  type="password"
                  autoComplete="current-password-confirm"
                  placeholder="비밀번호 확인 (8자 이상)"
                  required
                  className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password_confirm")}
                />
              </div>
              {errors.password_confirm && (
                <small className="text-primary-500" role="alert">
                  {errors.password_confirm.message}
                </small>
              )}
            </div>
            <div>
              <div className="mt-1">
                <input
                  id="nickname"
                  name="nickname"
                  type="nickname"
                  autoComplete="current-nickname"
                  placeholder="닉네임 (필수)"
                  required
                  className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("nickname")}
                />
              </div>
            </div>
            <div>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="current-email"
                  placeholder="이메일 (필수)"
                  className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("email", {
                    required: "이메일은 필수 입력입니다.",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "유효하지 않은 이메일입니다.",
                    },
                    minLength: {
                      value: 1,
                      message: "이메일을 입력해주세요.",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <small className="text-primary-500" role="alert">
                  {errors.email.message}
                </small>
              )}
            </div>

            {/* 동의 여부 */}
            <div>
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
                type="submit"
                disabled={!isValidationTrue}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-3
                   font-semibold leading-6 text-white shadow-sm hover:bg-blue-500
                    focus-visible:outline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-prigray-400"
              >
                가입하기
              </button>
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              이미 계정이 있으신가요?
              <a
                href="/login"
                className="ml-1 font-medium text-primary-500 hover:underline dark:text-primary-500"
              >
                로그인
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
