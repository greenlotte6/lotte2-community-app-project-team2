import { createBrowserRouter } from "react-router-dom";
import { Common } from "../pages/Common";
import { LoginPage } from "../pages/user/LoginPage";
import { Messengerpage } from "../pages/Messenger/Messengerpage";
import { Calenderpage } from "../pages/Calendar/Calenderpage";
import { Drivepage } from "../pages/Drive/Drivepage";
import { TermsPage } from "../pages/user/TermsPage";
import { SignupPage } from "../pages/user/SignupPage";

// 라우터 생성
const router = createBrowserRouter([
  { path: "/", element: <Common /> },

  //--------------------user---------------------
  { path: "/user/login", element: <LoginPage /> },
  { path: "/user/terms", element: <TermsPage /> },
  { path: "/user/signup", element: <SignupPage /> },
  //--------------------user----------------------

  { path: "/Messenger", element: <Messengerpage /> },
  { path: "/Calender", element: <Calenderpage /> },
  { path: "/Drive", element: <Drivepage /> },
]);

// 라우터 내보내기
export default router;
