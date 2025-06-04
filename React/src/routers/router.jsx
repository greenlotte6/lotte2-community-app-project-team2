import { createBrowserRouter } from "react-router-dom";
import { Common } from "../pages/common";
import { LoginPage } from "../pages/user/LoginPage";
import { Messengerpage } from "../pages/Messenger/Messengerpage";
import { Calenderpage } from "../pages/Calendar/Calenderpage";
import { Drivepage } from "../pages/Drive/Drivepage";

// 라우터 생성
const router = createBrowserRouter([
  { path: "/", element: <Common /> },
  { path: "/user/login", element: <LoginPage /> },
  { path: "/Messenger", element: <Messengerpage /> },
  { path: "/Calender", element: <Calenderpage /> },
  { path: "/Drive", element: <Drivepage /> },
]);

// 라우터 내보내기
export default router;
