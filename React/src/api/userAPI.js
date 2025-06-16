import axios from "axios";
import {
  USER_LOGIN,
  USER_REGISTER,
  USER_TERMS,
  SERVER_HOST,
  USER_LOGOUT,
  USER_EMAIL_SEND_CODE,
  USER_EMAIL_VERIFY_CODE,
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

// --- 이메일 인증 코드 발송 API ---
export const sendEmailVerificationCode = async (email) => {
  try {
    const response = await axios.post(
      USER_EMAIL_SEND_CODE,
      { email },
      { withCredentials: true } // <-- 이 부분을 추가합니다.
    );
    console.log("Email send response:", response);
    return response.data; // 성공 메시지 반환
  } catch (err) {
    console.error("Failed to send email verification code:", err);
    throw err; // 에러 다시 던지기
  }
};

// --- 이메일 인증 코드 확인 API ---
export const verifyEmailVerificationCode = async (authCode) => {
  try {
    const response = await axios.post(
      USER_EMAIL_VERIFY_CODE,
      { authCode },
      { withCredentials: true } // <-- 이 부분을 추가합니다.
    );
    console.log("Email verify response:", response);
    // 백엔드에서 { "isVerified": true/false } 형태로 오므로, isVerified 값을 반환
    return response.data.isVerified;
  } catch (err) {
    console.error("Failed to verify email verification code:", err);
    throw err;
  }
};
