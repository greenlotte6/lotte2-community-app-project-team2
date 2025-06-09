import "./styles/common.scss";
import "./styles/user/login.scss";
import "./styles/messenger/Messenger.scss";
import "./styles/Calender/Calender.scss";
import "./styles/Drive/Drive.scss";
import "./styles/user/terms.scss";
import "./styles/user/signup.scss";
import "./styles/user/findId.scss";
import "./styles/user/findPassword.scss";
import "./styles/myPage/myPage.scss";
import "./styles/membership/membership.scss";
import "./styles/membership/checkout.scss";
import { MainLayout } from "./layouts/MainLayout";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router";

/*
npm add react-router-dom
npm install @reduxjs/toolkit react-redux
npm add axios
npm install js-cookie
npm install sass
*/

function App() {
  return <RouterProvider router={router} />;
}

export default App;
