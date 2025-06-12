export const SERVER_HOST = "http://localhost:8080";
//export const SERVER_HOST =
//  import.meta.env.MODE === "development"
//? "http://localhost:8080"
//: "http://54.180.113.128:8080"; // 또는 배포용 도메인 (https://api.linkon.site)

// user
export const USER_TERMS = `${SERVER_HOST}/terms`;
export const USER_REGISTER = `${SERVER_HOST}/user`;
export const USER_LOGIN = `${SERVER_HOST}/user/login`;
export const USER_LOGOUT = `${SERVER_HOST}/user/logout`;

// mypage
export const MYPAGE_MYPAGE = `${SERVER_HOST}/myPage/myPage`;
