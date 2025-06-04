import { createBrowserRouter } from "react-router-dom";
import { Common } from "../pages/common";
import { LoginPage } from "../pages/user/LoginPage";
import { TermsPage } from "../pages/user/TermsPage";
import { SignupPage } from "../pages/user/SignupPage";

// 라우터 생성
const router = createBrowserRouter([
  { path: "/", element: <Common /> },
  { path: "/user/login", element: <LoginPage /> },
  { path: "/user/terms", element: <TermsPage /> },
  { path: "/user/signup", element: <SignupPage /> },
]);

// 라우터 내보내기
export default router;
