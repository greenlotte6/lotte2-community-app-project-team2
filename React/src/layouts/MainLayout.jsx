import React from "react";
import { Header } from "../components/common/Header";
import { Aside } from "../components/common/Aside";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export const MainLayout = ({ children }) => {
  const { username } = useAuth();
  const location = useLocation();

  /*
  // 로그인 안 된 경우 /user/login으로 리디렉션 (개발중일때는 주석처리, 개발 후 배포시 주석 해제)
  if (!username) {
    return <Navigate to="/user/login" state={{ from: location }} replace />;
  }
    */

  return (
    <div id="container">
      <Header />
      <main>
        <Aside />
        {children}
      </main>
    </div>
  );
};
