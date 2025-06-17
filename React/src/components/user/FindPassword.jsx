import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  sendCodeForFindPassword, // 비밀번호 찾기용 이메일 코드 발송 API
  resetPassword, // 비밀번호 재설정 API
} from "../../api/userAPI"; // userAPI 경로가 정확한지 다시 한번 확인해주세요!

export const FindPassword = () => {
  // --- 상태 관리 ---
  const [uid, setUid] = useState(""); // 기존 'user-name'이 아이디 필드였으므로 'uid'로 매핑
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isCodeSent, setIsCodeSent] = useState(false); // 인증 코드 발송 여부
  const [isCodeVerified, setIsCodeVerified] = useState(false); // 인증 코드 확인 여부 (비밀번호 입력창 표시용)
  const [message, setMessage] = useState(""); // 사용자에게 보여줄 메시지
  const [messageColor, setMessageColor] = useState(""); // 메시지 색상

  // DOM 요소 참조 (show/hide 제어용)
  // 기존 HTML 구조의 ID를 그대로 사용합니다.
  const verificationBoxRef = useRef(null);
  const newPasswordBoxRef = useRef(null);
  const findPasswordButtonRef = useRef(null); // 비밀번호 찾기 버튼 참조 추가
  const uidInputRef = useRef(null); // 아이디 입력 필드 참조 추가
  const emailInputRef = useRef(null); // 이메일 입력 필드 참조 추가
  const verifyButtonRef = useRef(null); // 인증하기 버튼 참조 추가
  const authEmailButtonRef = useRef(null); // 확인 버튼 참조 추가

  const navigate = useNavigate(); // 라우팅을 위한 useNavigate 훅

  // --- 이벤트 핸들러 ---

  // '인증하기' 버튼 클릭 핸들러 (이메일 인증 코드 발송)
  const handleSendCode = async () => {
    setMessage(""); // 이전 메시지 초기화
    setMessageColor("");

    // 아이디 필드는 이제 'uid' 상태와 연결
    if (!uid || !email) {
      setMessage("아이디와 이메일을 모두 입력해주세요.");
      setMessageColor("red");
      return;
    }

    try {
      const response = await sendCodeForFindPassword(uid, email);

      if (response.status === "SENT") {
        setMessage(
          "인증 코드가 이메일로 발송되었습니다. 5분 이내에 입력해주세요."
        );
        setMessageColor("green");
        setIsCodeSent(true); // 코드 발송 상태로 변경

        // 인증 코드 입력 박스 표시 (기존 display: 'none' 제거)
        if (verificationBoxRef.current) {
          verificationBoxRef.current.style.display = "flex";
        }
        // 아이디와 이메일 입력 필드 및 인증하기 버튼 비활성화
        if (uidInputRef.current) uidInputRef.current.disabled = true;
        if (emailInputRef.current) emailInputRef.current.disabled = true;
        if (verifyButtonRef.current) verifyButtonRef.current.disabled = true;
      } else if (response.status === "NO_USER") {
        setMessage(response.message);
        setMessageColor("red");
        setIsCodeSent(false); // 상태 초기화
      } else {
        setMessage(
          response.message || "이메일 발송에 실패했습니다. 다시 시도해주세요."
        );
        setMessageColor("red");
        setIsCodeSent(false); // 상태 초기화
      }
    } catch (error) {
      console.error("비밀번호 찾기 인증 코드 발송 중 오류 발생:", error);
      setMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setMessageColor("red");
      setIsCodeSent(false); // 상태 초기화
    }
  };

  // '확인' 버튼 클릭 핸들러 (인증 코드 확인 및 새 비밀번호 입력란 표시)
  const handleVerifyCode = () => {
    setMessage(""); // 이전 메시지 초기화
    setMessageColor("");

    if (!verificationCode) {
      setMessage("인증 코드를 입력해주세요.");
      setMessageColor("red");
      return;
    }

    if (verificationCode.length === 6) {
      // 간단한 클라이언트 측 길이 체크
      setMessage("인증 코드를 확인했습니다. 새 비밀번호를 입력해주세요.");
      setMessageColor("green");
      setIsCodeVerified(true); // 인증 완료 상태로 변경

      // 새 비밀번호 입력 박스 표시
      if (newPasswordBoxRef.current) {
        newPasswordBoxRef.current.style.display = "block";
      }
      // 인증 코드 입력 필드와 확인 버튼 비활성화
      if (verificationBoxRef.current) {
        verificationBoxRef.current.querySelector("input").disabled = true;
      }
      if (authEmailButtonRef.current)
        authEmailButtonRef.current.disabled = true;
      // 최종 '비밀번호 변경' 버튼 활성화
      if (findPasswordButtonRef.current)
        findPasswordButtonRef.current.disabled = false;
    } else {
      setMessage("유효한 6자리 인증 코드를 입력해주세요.");
      setMessageColor("red");
      setIsCodeVerified(false);
      // 최종 '비밀번호 변경' 버튼 비활성화
      if (findPasswordButtonRef.current)
        findPasswordButtonRef.current.disabled = true;
    }
  };

  // '비밀번호 찾기' (실제 비밀번호 재설정) 버튼 클릭 핸들러
  const handleResetPassword = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작 방지
    setMessage("");
    setMessageColor("");

    if (
      !uid ||
      !email ||
      !verificationCode ||
      !newPassword ||
      !confirmPassword
    ) {
      setMessage("모든 정보를 입력하고 인증을 완료해주세요.");
      setMessageColor("red");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      setMessageColor("red");
      return;
    }

    // 비밀번호 형식 검증 (예시: 최소 8자)
    if (newPassword.length < 8) {
      setMessage("비밀번호는 최소 8자 이상이어야 합니다.");
      setMessageColor("red");
      return;
    }

    try {
      const response = await resetPassword(
        uid,
        email,
        verificationCode,
        newPassword,
        confirmPassword
      );

      if (response.status === "SUCCESS") {
        setMessage(
          "비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다."
        );
        setMessageColor("blue");
        // 2초 후 로그인 페이지로 리다이렉트
        setTimeout(() => {
          navigate("/user/login");
        }, 2000);
      } else {
        setMessage(
          response.message ||
            "비밀번호 재설정에 실패했습니다. 다시 시도해주세요."
        );
        setMessageColor("red");
      }
    } catch (error) {
      console.error("비밀번호 재설정 중 오류 발생:", error);
      setMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setMessageColor("red");
    }
  };

  // '취소' 버튼 클릭 핸들러
  const handleCancel = () => {
    // 모든 상태 초기화
    setUid("");
    setEmail("");
    setVerificationCode("");
    setNewPassword("");
    setConfirmPassword("");
    setIsCodeSent(false);
    setIsCodeVerified(false);
    setMessage("");
    setMessageColor("");

    // 모든 DOM 요소 초기 상태로 되돌리기
    if (uidInputRef.current) uidInputRef.current.disabled = false;
    if (emailInputRef.current) emailInputRef.current.disabled = false;
    if (verifyButtonRef.current) verifyButtonRef.current.disabled = false;
    if (verificationBoxRef.current)
      verificationBoxRef.current.style.display = "none";
    if (
      verificationBoxRef.current &&
      verificationBoxRef.current.querySelector("input")
    )
      verificationBoxRef.current.querySelector("input").disabled = false;
    if (authEmailButtonRef.current) authEmailButtonRef.current.disabled = false;
    if (newPasswordBoxRef.current)
      newPasswordBoxRef.current.style.display = "none";
    if (findPasswordButtonRef.current)
      findPasswordButtonRef.current.disabled = true; // 취소 시 다시 비활성화

    // 홈으로 리다이렉트하거나 필요에 따라 다른 경로로 이동
    // navigate('/');
  };

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
          {/* form id는 그대로 유지하되, onSubmit 이벤트 핸들러만 연결 */}
          <form id="find-id-form" onSubmit={handleResetPassword}>
            <div className="input-box">
              <input
                type="text"
                id="user-name" // 기존 ID "user-name" 유지
                placeholder="아이디 입력"
                required
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                ref={uidInputRef} // useRef 연결
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                id="user-email" // 기존 ID "user-email" 유지
                placeholder="이메일 주소 입력"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailInputRef} // useRef 연결
              />
              <button
                type="button"
                id="verify-btn" // 기존 ID "verify-btn" 유지
                className="btn verify-btn"
                onClick={handleSendCode} // 이벤트 핸들러 연결
                ref={verifyButtonRef} // useRef 연결
              >
                {isCodeSent ? "재전송" : "인증하기"}{" "}
                {/* 상태에 따라 텍스트 변경 */}
              </button>
            </div>
            <div
              className="input-box"
              id="verification-box" // 기존 ID "verification-box" 유지
              ref={verificationBoxRef} // useRef 연결
              style={{ display: "none" }} // 초기 display: "none" 유지
            >
              <input
                type="text"
                id="verification-code" // 기존 ID "verification-code" 유지
                placeholder="인증코드 입력"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                id="btnAuthEmail" // 기존 ID "btnAuthEmail" 유지
                type="button"
                className="btn"
                onClick={handleVerifyCode} // 이벤트 핸들러 연결
                ref={authEmailButtonRef} // useRef 연결
              >
                확인
              </button>
            </div>

            <div
              id="new-password-box"
              ref={newPasswordBoxRef}
              style={{ display: "none" }}
            >
              {" "}
              {/* 기존 ID "new-password-box" 유지 */}
              <div className="input-box">
                <input
                  type="password"
                  id="new-password" // 기존 ID "new-password" 유지
                  placeholder="새 비밀번호 입력"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  id="confirm-password" // 기존 ID "confirm-password" 유지
                  placeholder="새 비밀번호 확인"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <span className="result" style={{ color: messageColor }}>
                {message}
              </span>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn cancel-btn"
                onClick={handleCancel}
              >
                취소
              </button>
              <button
                type="submit"
                className="btn login-btn"
                disabled={true} // 초기에는 비활성화 (인증 코드 확인 후 활성화)
                ref={findPasswordButtonRef} // useRef 연결
              >
                비밀번호 변경
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
          <Link to="/user/login">로그인</Link>
        </div>
      </div>
    </div>
  );
};
