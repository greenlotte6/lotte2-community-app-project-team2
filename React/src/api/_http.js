//const SERVER_HOST = "http://localhost:8080";
const SERVER_HOST =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : "http://54.180.113.128:8080"; // 또는 배포용 도메인 (https://api.linkon.site)

// user
export const USER_TERMS = `${SERVER_HOST}/terms`;
