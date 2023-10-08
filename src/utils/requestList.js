import axios from "axios";
import { comment } from "../json/comment";
import { BACK_PATH } from "../config/config_home"
import { gwangju_store } from "../json/gwangju_store";

// naver 블로그 API
export async function naverSearchData(word) {
    try {
        const response = await axios.get(`${BACK_PATH}/naverSearch?word=${word}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// 댓글 데이터 필터
export async function getCommentData(query) {
    const data = comment.filter((item) => item["시장정보"] === query);
    return data;
}

// 시장 데이터 가져오기 - 필터링
export const getMarketData = async (word = "") => {
    try {
        const res = await axios.get(`${BACK_PATH}/search?word=${word}`);
        return res.data;
    } catch (err) {
        console.log(err);
        return false;
    }
};

// 시장 데이터 가져오기
export const getAllMarketData = async () => {
    try {
        const res = await axios.get(`${BACK_PATH}/marketList`);
        return res.data;
    } catch (err) {
        console.log(err);
        return false;
    }
};

// 지리정보 데이터 가져오기
export const getAllGeoCodeData = async () => {
    try {
        const res = await axios.get(`${BACK_PATH}/geoList`);
        return res.data.geoList;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const getSearchData = async (word) => {
    try {
        const res = await axios.get(`${BACK_PATH}/autoComplete?word=${word}`);
        return res.data.list;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// 회원가입
export const postSignup = async (param) => {
    const params = {
        ...param,

    }

    try {
        const res = await axios.post(`${BACK_PATH}/join`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(res)
        return res.data;
    } catch (err) {
        console.log(err);
        return false;
    }

}

// 로그인
export const postLogin = async (param) => {
    const params = {
        ...param,
    }

    try {
        const res = await axios.post(`${BACK_PATH}/login`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// 중복 체크
export const checkDuplicateId = async (param) => {
    const params = {
        ...param,
    }

    try {
        const response = await axios.post(`${BACK_PATH}/duplicateId`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.result;
    } catch (error) {
        console.error(error);
        return false;
    }
};

// 아이디 찾기
export const requestFindId = async (param) => {
    const params = {
        ...param,
    }

    try {
        const response = await axios.post(`${BACK_PATH}/findId`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }

}

// 이메일 보내기
export const sendEmail = async (email) => {
    try {
        const res = await axios.get(`${BACK_PATH}/verification?email=${email}`);
        return res.data;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// 시장 데이터 가져오기
export const requestStoreData = (name) => {
    const data = gwangju_store.filter((store) => store["시장명"] === name);
    return data;
}

// 카카오 로그인 중복 확인
export const checkKakaoDuplicate = async (response) => {
    try {
        const res = await axios.post(`${BACK_PATH}/kakaotalkDup`, response);
        return res.data;
    } catch (err) {
        console.log(err);
        return false;
    }

}

// 카카오 회원가입
export const checkKakaoSignup = async (response) => {
    try {
        const res = await axios.post(`${BACK_PATH}/kakaotalkJoin`, response);
        return res.data;
    } catch (err) {
        console.log(err);
        return false;
    }

}

// 아이디 찾기
export const requestForgetId = async (param) => {
    const params = {
        ...param,
    }
    try {
        const res = await axios.post(`${BACK_PATH}/forgetId`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// 비밀번호 찾기
export const requestForgetPw = async (param) => {
    const params = {
        ...param,
    }
    try {
        const res = await axios.post(`${BACK_PATH}/forgetPw`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return false;
    }
}


// 비밀번호 바꾸기
export const requestModPw = async (param) => {
    const params = {
        ...param,
    }
    try {
        const res = await axios.post(`${BACK_PATH}/modPw`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return false;
    }

}