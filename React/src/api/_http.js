//export const SERVER_HOST = "http://localhost:8080";
export const SERVER_HOST =
  import.meta.env.MODE === "development" ? "http://localhost:8080" : "/api"; // 프록시 경로

// user
export const USER_TERMS = `${SERVER_HOST}/terms`;
export const USER_REGISTER = `${SERVER_HOST}/user`;
export const USER_LOGIN = `${SERVER_HOST}/user/login`;
export const USER_LOGOUT = `${SERVER_HOST}/user/logout`;

// --- 이메일 인증 관련 경로 추가 ---
export const USER_EMAIL_SEND_CODE = `${SERVER_HOST}/user/email/sendCode`;
export const USER_EMAIL_VERIFY_CODE = `${SERVER_HOST}/user/email/auth`; // 기존 email/auth 경로 활용

// --- 아이디 찾기 관련 경로 추가 ---
export const USER_FIND_ID_SEND_CODE = `${SERVER_HOST}/user/findId/sendCode`; // 새로운 경로
export const USER_FIND_ID_VERIFY_CODE = `${SERVER_HOST}/user/findId/verifyCode`; // 새로운 경로

// --- 비밀번호 찾기 관련 경로 추가 ---
export const USER_FIND_PASSWORD_SEND_CODE = `${SERVER_HOST}/user/findPassword/sendCode`; // 새로운 경로
export const USER_FIND_PASSWORD_RESET = `${SERVER_HOST}/user/findPassword/reset`; // 새로운 경로

// mypage
export const MYPAGE_MYPAGE = `${SERVER_HOST}/myPage/myPage`;

// Project
export const PROJECTS_API = `${SERVER_HOST}/projects`; // GET (조회), POST (생성)
export const PROJECT_DELETE_API = (id) => `${SERVER_HOST}/projects/${id}`; 
