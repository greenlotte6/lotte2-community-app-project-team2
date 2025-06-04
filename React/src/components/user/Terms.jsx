import React from "react";
import { Link } from "react-router-dom";

export const Terms = () => {
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
          <h1>이용약관</h1>
        </div>

        <form>
          <div className="term-section">
            <label>
              LinkON 이용약관 <span style={{ color: "red" }}>(필수)</span>
            </label>
            <div className="term-content">
              이용약관 내용이 여기에 표시됩니다.이용약관 내용이 여기에
              표시됩니다.이용약관 내용이 여기에 표시됩니다.이용약관 내용이
              여기에 표시됩니다.이용약관 내용이 여기에 표시됩니다.이용약관
              내용이 여기에 표시됩니다.이용약관 내용이 여기에
              표시됩니다.이용약관 내용이 여기에 표시됩니다.이용약관 내용이
              여기에 표시됩니다.이용약관 내용이 여기에 표시됩니다.이용약관
              내용이 여기에 표시됩니다.이용약관 내용이 여기에
              표시됩니다.이용약관 내용이 여기에 표시됩니다.
            </div>
            <div className="agree-checkbox">
              <input type="checkbox" id="agree1" />
              <label for="agree1">동의</label>
            </div>
          </div>

          <div className="term-section">
            <label>
              개인정보 이용 동의 약관
              <span style={{ color: "red" }}>(필수)</span>
            </label>
            <div className="term-content">
              개인정보 수집 및 이용에 대한 안내 내용이 여기에
              표시됩니다.개인정보 수집 및 이용에 대한 안내 내용이 여기에
              표시됩니다.개인정보 수집 및 이용에 대한 안내 내용이 여기에
              표시됩니다.개인정보 수집 및 이용에 대한 안내 내용이 여기에
              표시됩니다.개인정보 수집 및 이용에 대한 안내 내용이 여기에
              표시됩니다.개인정보 수집 및 이용에 대한 안내 내용이 여기에
              표시됩니다.개인정보 수집 및 이용에 대한 안내 내용이 여기에
              표시됩니다.개인정보 수집 및 이용에 대한 안내 내용이 여기에
              표시됩니다.개인정보 수집 및 이용에 대한 안내 내용이 여기에
            </div>
            <div className="agree-checkbox">
              <input type="checkbox" id="agree2" />
              <label for="agree2">동의</label>
            </div>
          </div>

          <button
            type="button"
            className="signup-btn"
            onclick="location.href='/view/user/signup.html'"
          >
            다음
          </button>

          <div className="already-account">
            이미 계정이 있으신가요? <Link to="/user/login">로그인</Link>
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
