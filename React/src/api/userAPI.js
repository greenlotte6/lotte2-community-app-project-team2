import axios from "axios";
import {
  USER_LOGIN,
  USER_REGISTER,
  USER_TERMS,
  SERVER_HOST,
  USER_LOGOUT,
  USER_EMAIL_SEND_CODE,
  USER_EMAIL_VERIFY_CODE,
  USER_FIND_ID_SEND_CODE,
  USER_FIND_ID_VERIFY_CODE,
  USER_FIND_PASSWORD_SEND_CODE,
  USER_FIND_PASSWORD_RESET,
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

// --- 회원가입 이메일 인증 코드 발송 API (기존) ---
export const sendEmailVerificationCode = async (email) => {
  try {
    const response = await axios.post(
      USER_EMAIL_SEND_CODE,
      { email },
      { withCredentials: true }
    );
    console.log("Signup Email send response:", response); // 로그에 기능 명시
    return response.data;
  } catch (err) {
    console.error("Failed to send signup email verification code:", err); // 로그에 기능 명시
    throw err;
  }
};

// --- 회원가입 이메일 인증 코드 확인 API (기존) ---
export const verifyEmailVerificationCode = async (authCode) => {
  try {
    const response = await axios.post(
      USER_EMAIL_VERIFY_CODE,
      { authCode },
      { withCredentials: true }
    );
    console.log("Signup Email verify response:", response); // 로그에 기능 명시
    return response.data.isVerified;
  } catch (err) {
    console.error("Failed to verify signup email verification code:", err); // 로그에 기능 명시
    throw err;
  }
};

// --- 아이디 찾기 - 이메일 인증 코드 발송 API ---
// 이름과 이메일을 함께 보냄
export const sendCodeForFindId = async (name, email) => {
  try {
    const response = await axios.post(
      USER_FIND_ID_SEND_CODE,
      { name, email }, // 이름과 이메일 함께 전송
      { withCredentials: true }
    );
    console.log("FindId Email send response:", response);
    return response.data; // 백엔드에서 JSON 응답을 반환하므로 그대로 반환
  } catch (err) {
    console.error("Failed to send findId email verification code:", err);
    throw err;
  }
};

// --- 아이디 찾기 - 이메일 인증 및 아이디 반환 API ---
// 이름, 이메일, 인증 코드를 함께 보냄
export const verifyCodeAndFindId = async (name, email, code) => {
  try {
    const response = await axios.post(
      USER_FIND_ID_VERIFY_CODE,
      { name, email, code }, // 이름, 이메일, 코드 함께 전송
      { withCredentials: true }
    );
    console.log("FindId Verify & Find response:", response);
    return response.data; // 백엔드에서 JSON 응답을 반환하므로 그대로 반환 (status, message, userId 등 포함)
  } catch (err) {
    console.error("Failed to verify code and find id:", err);
    throw err;
  }
};

// --- 비밀번호 찾기 - 이메일 인증 코드 발송 API ---
// 아이디(uid)와 이메일을 함께 보냄
export const sendCodeForFindPassword = async (uid, email) => {
  // uid 파라미터로 변경
  try {
    const response = await axios.post(
      USER_FIND_PASSWORD_SEND_CODE,
      { uid, email }, // uid와 이메일 함께 전송
      { withCredentials: true }
    );
    console.log("FindPassword Email send response:", response);
    return response.data;
  } catch (err) {
    console.error("Failed to send find password email verification code:", err);
    throw err;
  }
};

// --- 비밀번호 찾기 - 인증 코드 확인 및 비밀번호 재설정 API ---
// 아이디(uid), 이메일, 인증 코드, 새 비밀번호, 비밀번호 확인을 함께 보냄
export const resetPassword = async (
  uid,
  email,
  code,
  newPassword,
  confirmPassword
) => {
  // uid 파라미터로 변경
  try {
    const response = await axios.post(
      USER_FIND_PASSWORD_RESET,
      { uid, email, code, newPassword, confirmPassword }, // uid 포함
      { withCredentials: true }
    );
    console.log("Password Reset response:", response);
    return response.data;
  } catch (err) {
    console.error("Failed to reset password:", err);
    throw err;
  }
};
