import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTerms } from "../../api/userAPI";

export const Terms = () => {
  const [termsText, setTermsText] = useState("");
  const [privacyText, setPrivacyText] = useState("");

  // 체크 상태 관리
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // 약관 데이터 fetch 비동기 함수
    const fetchData = async () => {
      try {
        // 약관 데이터 요청하기
        const data = await getTerms();

        setTermsText(data.terms);
        setPrivacyText(data.privacy);
      } catch (err) {
        console.error(err);
      }
    };

    // 호출
    fetchData();
  }, []);

  const handleNext = () => {
    if (!agree1 || !agree2) {
      alert("모든 약관에 동의하셔야 다음 단계로 넘어갈 수 있습니다.");
      return;
    }
    // 모두 동의했으면 회원가입 페이지로 이동
    navigate("/user/signup");
  };

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
            <div className="term-content">{termsText}</div>
            <div className="agree-checkbox">
              <input
                type="checkbox"
                id="agree1"
                checked={agree1}
                onChange={(e) => setAgree1(e.target.checked)}
              />
              <label for="agree1">동의</label>
            </div>
          </div>

          <div className="term-section">
            <label>
              개인정보 이용 동의 약관
              <span style={{ color: "red" }}>(필수)</span>
            </label>
            <div className="term-content">{privacyText}</div>
            <div className="agree-checkbox">
              <input
                type="checkbox"
                id="agree2"
                checked={agree2}
                onChange={(e) => setAgree2(e.target.checked)}
              />
              <label for="agree2">동의</label>
            </div>
          </div>

          <button type="button" className="signup-btn" onClick={handleNext}>
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
