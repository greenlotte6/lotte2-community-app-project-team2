import axios from "axios";
import {
  USER_LOGIN,
  USER_REGISTER,
  USER_TERMS,
  SERVER_HOST,
  USER_LOGOUT,
} from "./_http";

export const getTerms = async () => {
  try {
    const response = await axios.get(`${USER_TERMS}`);
    console.log(response.data);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postUser = async (data) => {
  try {
    const response = await axios.post(`${USER_REGISTER}`, data);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postUserLogin = async (data) => {
  try {
    const response = await axios.post(`${USER_LOGIN}`, data, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 중복 확인 API
export const checkUserDuplicate = async (type, value) => {
  try {
    const response = await axios.get(`${SERVER_HOST}/user/${type}/${value}`);
    const count = response.data.count;

    let label;
    if (type === "uid") label = "아이디";
    else if (type === "email") label = "이메일";
    else if (type === "hp") label = "연락처";

    if (count > 0) {
      return {
        valid: false,
        msg: `이미 존재하는 ${label}입니다.`,
        color: "red",
      };
    } else {
      return {
        valid: true,
        msg: `사용 가능한 ${label}입니다.`,
        color: "green",
      };
    }
  } catch (error) {
    return {
      valid: false,
      msg: "서버 오류가 발생했습니다.",
      color: "red",
    };
  }
};

export const getUserLogout = async () => {
  try {
    const response = await axios.get(`${USER_LOGOUT}`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
