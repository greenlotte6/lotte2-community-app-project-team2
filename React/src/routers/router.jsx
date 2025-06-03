import { createBrowserRouter } from "react-router-dom";
import { Common } from "../pages/common";
import { LoginPage } from "../pages/user/LoginPage";

// 라우터 생성
const router = createBrowserRouter([
  { path: "/", element: <Common /> },
  { path: "/user/login", element: <LoginPage /> },
]);

// 라우터 내보내기
export default router;
