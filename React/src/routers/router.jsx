import { createBrowserRouter } from "react-router-dom";
import { Common } from "../pages/Common";
import { LoginPage } from "../pages/user/LoginPage";
import { Messengerpage } from "../pages/Messenger/Messengerpage";
import { Calenderpage } from "../pages/Calendar/Calenderpage";
import { Drivepage } from "../pages/Drive/Drivepage";
import { TermsPage } from "../pages/user/TermsPage";
import { SignupPage } from "../pages/user/SignupPage";
import { FindIdPage } from "../pages/user/FindIdPage";
import { FindPasswordPage } from "../pages/user/FindPasswordPage";
import { MyPagePage } from "../pages/myPage/MyPagePage";
import { MembershipPage } from "../pages/membership/MembershipPage";
import { CheckoutPage } from "../pages/membership/CheckoutPage";
import  ListPage  from "../pages/board/ListPage";
import { ViewPage } from "../pages/board/ViewPage";
import { WritePage } from "../pages/board/WritePage";
import { MainPage } from "../pages/board/MainPage";

// 라우터 생성
const router = createBrowserRouter([
  { path: "/", element: <Common /> },

  //--------------------user---------------------
  { path: "/user/login", element: <LoginPage /> },
  { path: "/user/terms", element: <TermsPage /> },
  { path: "/user/signup", element: <SignupPage /> },
  { path: "/user/findId", element: <FindIdPage /> },
  { path: "/user/findPassword", element: <FindPasswordPage /> },

  //--------------------mypage-----------------------
  { path: "/myPage/myPage", element: <MyPagePage /> },
  
  { path: "/Messenger", element: <Messengerpage /> },
  { path: "/Calender", element: <Calenderpage /> },
  { path: "/Drive", element: <Drivepage /> },

  //--------------------membership-----------------------
  { path: "/membership/membership", element: <MembershipPage /> },
  { path: "/membership/checkout", element: <CheckoutPage /> },

  //--------------------board-----------------------
  { path: "/board", element: <MainPage /> },
  { path: "/board/list", element: <ListPage /> },
  { path: "/board/view", element: <ViewPage /> },
  { path: "/board/write", element: <WritePage /> },
]);

// 라우터 내보내기
export default router;
