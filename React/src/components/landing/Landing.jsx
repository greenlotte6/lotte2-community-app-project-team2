import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div id="wrapper">
      <header>
        <div className="headerContainer">
          <div>
            <div>
              <div className="logoContainer">
                <Link to="/">
                  <img
                    src="/images/linkON_logo_upscaled.png"
                    alt="logo"
                    className="headerLogo"
                  />
                  <h2 className="logoText">LinkON</h2>
                </Link>
              </div>
              <Link to="/view/LandingPage/function.html">기능</Link>
              <Link to="/view/LandingPage/pricingPlan.html">요금제</Link>
              <Link to="/view/LandingPage/support.html">지원</Link>
            </div>
            <div>
              <Link to="/user/login">로그인</Link>
              <Link to="/user/login" className="freeStart">
                무료로 시작하기
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div>
          <div className="mainContainer">
            <div className="mainContent">
              <p className="title animate__fadeInUp">
                당신의 팀워크를 연결하다.
              </p>
              <p className="subtitle first animate__fadeInUp">
                <span>LinkON</span>은 팀의 소통을 더 빠르게,
              </p>
              <p className="subtitle second animate__fadeInUp">
                협업을 더 유연하게 만들어주는
              </p>
              <p className="subtitle third animate__fadeInUp">
                올인원 비즈니스 메신저입니다.
              </p>
            </div>
            <div>
              <img src="/images/character.png" className="character" />
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-container">
          <div className="footer-links">
            <div className="footerLogo">
              <img src="/images/footerLogo.png" alt="LinkON 로고" />
              <h3>LinkON</h3>
            </div>
            <div>
              <h4>회사 정보</h4>
              <p>대표자: 손준오, 한결, 정진우, 홍준혁</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>주소 : 부산광역시 부산진구 중앙대로 749 4층</p>
            </div>
            <div>
              <h4>고객 지원</h4>
              <Link to="#">문의하기</Link>
              <Link to="#">자주 묻는 질문</Link>
            </div>
            <div>
              <h4>정책</h4>
              <Link to="#">이용약관</Link>
              <Link to="#">개인정보처리방침</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © 2025 LinkON Inc. All rights reserved. | 버전: 0.1.0-SNAPSHOT
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
