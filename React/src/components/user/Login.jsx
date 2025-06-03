import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div id="login">
      <div className="login-container">
        <div className="login-box">
          <img
            src="/images/user/2조 로고 아이콘.png"
            alt="LinkON 로고"
            className="logo"
          />
          <h1>LinkON</h1>

          <form>
            <div className="input-group">
              <input type="text" id="email" placeholder="아이디" />
            </div>

            <div className="input-group">
              <input type="password" id="password" placeholder="비밀번호" />
            </div>

            <div className="options">
              <label>
                <input type="checkbox" /> 자동로그인
              </label>
              <div className="find-links">
                <Link to="/view/user/findId.html">아이디찾기</Link> /
                <Link to="/view/user/findPassword.html">비밀번호 찾기</Link>
              </div>
            </div>

            <button
              type="button"
              className="login-btn"
              onclick="location.href='/view/myPage/myPage.html'"
            >
              로그인
            </button>
          </form>

          <div className="divider">또는</div>

          <div className="social-login">
            <button className="google">G 구글</button>
            <button className="naver">네이버</button>
            <button className="kakao">카카오톡</button>
          </div>

          <div className="signup">
            <Link to="/view/user/terms.html">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
