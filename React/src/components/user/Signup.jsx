import React from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
  return (
    <div className="terms-container">
      <div className="terms-box">
        <div className="title-section">
          <img
            src="/images/user/2조 로고 아이콘.png"
            alt="LinkON 로고"
            className="logo"
          />
          <h2>LinkON</h2>
          <h1>회원가입</h1>
        </div>

        <form>
          <div className="input-group">
            <label for="id">아이디</label>
            <div className="input-with-button">
              <input type="text" id="id" placeholder="아이디 입력" />
              <button type="button" className="check-btn" onclick="checkId()">
                중복확인
              </button>
            </div>
            <p id="id-msg" className="message"></p>
          </div>
          <div className="input-group">
            <label for="pw">비밀번호</label>
            <input type="password" id="pw" placeholder="Placeholder" />
          </div>
          <div className="input-group">
            <label for="pw-check">비밀번호 확인</label>
            <input type="password" id="pw-check" placeholder="Placeholder" />
          </div>
          <div className="input-group">
            <label for="name">이름</label>
            <input type="text" id="name" placeholder="Placeholder" />
          </div>
          <div className="input-group">
            <label for="phone">휴대폰</label>
            <input type="text" id="phone" placeholder="Placeholder" />
          </div>

          <div className="input-group">
            <label for="email">이메일</label>
            <div className="input-with-button">
              <input type="email" id="email" placeholder="이메일 입력" />
              <button
                type="button"
                className="check-btn"
                onclick="sendEmailCode()"
              >
                인증
              </button>
            </div>
            <div id="email-verification" style={{ display: "none" }}>
              <input type="text" id="email-code" placeholder="인증번호 입력" />
              <button
                type="button"
                className="check-btn"
                onclick="verifyCode()"
              >
                확인
              </button>
            </div>
            <p id="email-msg" className="message"></p>
          </div>

          <button
            type="button"
            className="signup-btn"
            onclick="location.href='/view/user/login.html'"
          >
            다음
          </button>

          <div className="already-account">
            이미 계정이 있으신가요?{" "}
            <Link to="/view/user/login.html">로그인</Link>
          </div>

          <div className="social-login">
            <button>Google</button>
            <button>Apple</button>
            <button>Twitter</button>
          </div>
        </form>
      </div>
    </div>
  );
};
