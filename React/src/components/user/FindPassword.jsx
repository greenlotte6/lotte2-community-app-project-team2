import React from "react";
import { Link } from "react-router-dom";

export const FindPassword = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="/images/user/2조 로고 아이콘.png"
          alt="LinkON 로고"
          className="logo"
        />
        <h1>LinkON</h1>

        <section id="find-pw">
          <h2>비밀번호 찾기</h2>
          <p>가입 시 등록한 아이디와 이메일 주소를 입력해 주세요.</p>
          <form id="find-id-form">
            <div className="input-box">
              <input
                type="text"
                id="user-name"
                placeholder="아이디 입력"
                required
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                id="user-email"
                placeholder="이메일 주소 입력"
                required
              />
              <button type="button" id="verify-btn" className="btn verify-btn">
                인증하기
              </button>
            </div>
            <div
              className="input-box"
              id="verification-box"
              style={{ display: "none" }}
            >
              <input
                type="text"
                id="verification-code"
                placeholder="인증코드 입력"
                required
              />
              <button id="btnAuthEmail" type="button" className="btn">
                확인
              </button>
            </div>

            <div id="new-password-box" style={{ display: "none" }}>
              <div className="input-box">
                <input
                  type="password"
                  id="new-password"
                  placeholder="새 비밀번호 입력"
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="새 비밀번호 확인"
                  required
                />
              </div>
            </div>

            <div>
              <span className="result"></span>
            </div>
            <div className="btn-container">
              <button type="button" className="btn cancel-btn">
                취소
              </button>
              <button type="submit" className="btn login-btn" disabled>
                비밀번호 찾기
              </button>
            </div>
          </form>
        </section>

        <div className="divider">또는</div>

        <div className="social-login">
          <button className="google">G 구글</button>
          <button className="naver">네이버</button>
          <button className="kakao">카카오톡</button>
        </div>

        <div className="signup">
          <Link to="/user/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
};
