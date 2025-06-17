import React, { useState, useRef } from "react"; // useRef 추가
import { Link } from "react-router-dom";
import {
  sendCodeForFindId, // 아이디 찾기용 이메일 코드 발송 API
  verifyCodeAndFindId, // 아이디 찾기용 이메일 인증 및 아이디 반환 API
} from "../../api/userAPI"; // userAPI 경로가 정확한지 확인 (상대 경로로 수정)

export const FindId = () => {
  // --- 상태 관리 ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증 코드 발송 여부
  const [isCodeVerified, setIsCodeVerified] = useState(false); // 인증 코드 확인 여부
  const [message, setMessage] = useState(""); // 사용자에게 보여줄 메시지
  const [messageColor, setMessageColor] = useState(""); // 메시지 색상
  const [foundUserId, setFoundUserId] = useState(""); // 찾은 아이디
  const [isFindingId, setIsFindingId] = useState(false); // 아이디 찾기 버튼 활성화 제어

  // 인증 코드 입력 박스 참조 (show/hide 제어용)
  const verificationBoxRef = useRef(null);

  // --- 이벤트 핸들러 ---

  // '인증하기' 버튼 클릭 핸들러 (이메일 인증 코드 발송)
  const handleSendCode = async () => {
    setMessage(""); // 이전 메시지 초기화
    setMessageColor("");

    if (!name || !email) {
      setMessage("이름과 이메일을 모두 입력해주세요.");
      setMessageColor("red");
      return;
    }

    try {
      const response = await sendCodeForFindId(name, email); // API 호출

      if (response.status === "SENT") {
        setMessage(
          "인증 코드가 이메일로 발송되었습니다. 5분 이내에 입력해주세요."
        );
        setMessageColor("green");
        setIsCodeSent(true); // 코드 발송 상태로 변경
        // 인증 코드 입력 박스 표시
        if (verificationBoxRef.current) {
          verificationBoxRef.current.style.display = "flex"; // CSS display 속성 변경
        }
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
      console.error("인증 코드 발송 중 오류 발생:", error);
      setMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setMessageColor("red");
      setIsCodeSent(false); // 상태 초기화
    }
  };

  // '확인' 버튼 클릭 핸들러 (인증 코드 확인 및 아이디 찾기)
  const handleVerifyCodeAndFindId = async () => {
    setMessage(""); // 이전 메시지 초기화
    setMessageColor("");

    if (!name || !email || !verificationCode) {
      setMessage("모든 정보를 입력하고 인증 코드를 확인해주세요.");
      setMessageColor("red");
      return;
    }

    try {
      const response = await verifyCodeAndFindId(name, email, verificationCode); // API 호출

      if (response.status === "SUCCESS") {
        setMessage("인증이 완료되었습니다. 당신의 아이디는 다음과 같습니다.");
        setMessageColor("green");
        setFoundUserId(response.userId); // 찾은 아이디 저장
        setIsCodeVerified(true); // 코드 인증 완료
        setIsFindingId(true); // 아이디 찾기 버튼 활성화
      } else if (response.status === "CODE_MISMATCH_OR_EXPIRED") {
        setMessage(response.message); // "인증 코드가 일치하지 않거나 만료되었습니다."
        setMessageColor("red");
        setIsCodeVerified(false); // 상태 초기화
        setIsFindingId(false);
      } else if (response.status === "USER_NOT_FOUND") {
        setMessage(response.message); // "인증되었지만, 일치하는 회원 정보가 없습니다."
        setMessageColor("red");
        setIsCodeVerified(false); // 상태 초기화
        setIsFindingId(false);
      } else {
        setMessage(
          response.message || "아이디 찾기에 실패했습니다. 다시 시도해주세요."
        );
        setMessageColor("red");
        setIsCodeVerified(false); // 상태 초기화
        setIsFindingId(false);
      }
    } catch (error) {
      console.error("인증 코드 확인 및 아이디 찾기 중 오류 발생:", error);
      setMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setMessageColor("red");
      setIsCodeVerified(false); // 상태 초기화
      setIsFindingId(false);
    }
  };

  // '취소' 버튼 클릭 핸들러
  const handleCancel = () => {
    // 모든 상태 초기화 및 페이지 리로드 또는 라우팅
    setName("");
    setEmail("");
    setVerificationCode("");
    setIsCodeSent(false);
    setIsCodeVerified(false);
    setMessage("");
    setMessageColor("");
    setFoundUserId("");
    setIsFindingId(false);
    if (verificationBoxRef.current) {
      verificationBoxRef.current.style.display = "none";
    }
    // 필요하다면 window.location.reload(); 또는 navigate('/') 등 사용
  };

  // '아이디 찾기' 최종 버튼 (실제로 이 버튼은 거의 사용되지 않을 것임. '확인' 버튼에서 이미 아이디를 보여주므로)
  // 하지만 사용자 경험을 위해 남겨둘 수 있습니다.
  const handleSubmitFindId = (e) => {
    e.preventDefault();
    // 이미 handleVerifyCodeAndFindId에서 아이디를 찾아서 보여주기 때문에,
    // 이 버튼은 단순히 '찾은 아이디 보여주기' 역할만 할 수 있습니다.
    // 여기서는 별도 API 호출 없이 상태에 있는 foundUserId를 보여주는 로직만 추가합니다.
    if (isCodeVerified && foundUserId) {
      setMessage(`당신의 아이디는 '${foundUserId}' 입니다.`);
      setMessageColor("blue");
    } else {
      setMessage("먼저 이메일 인증을 완료해주세요.");
      setMessageColor("red");
    }
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
          <h2>아이디 찾기</h2>
          <p>가입 시 등록한 이름과 이메일 주소를 입력해 주세요.</p>
          <form id="find-id-form" onSubmit={handleSubmitFindId}>
            <div className="input-box">
              <input
                type="text"
                id="user-name"
                placeholder="이름 입력"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                id="user-email"
                placeholder="이메일 주소 입력"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                id="verify-btn"
                className="btn verify-btn"
                onClick={handleSendCode} // 핸들러 연결
                disabled={isCodeSent && !isCodeVerified} // 코드 발송 후에는 재발송 방지
              >
                {isCodeSent ? "재전송" : "인증하기"}{" "}
                {/* 코드 발송되면 텍스트 변경 */}
              </button>
            </div>
            <div
              className="input-box"
              id="verification-box"
              ref={verificationBoxRef} // useRef 연결
              style={{ display: isCodeSent ? "flex" : "none" }} // 상태에 따라 표시
            >
              <input
                type="text"
                id="verification-code"
                placeholder="인증코드 입력"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                disabled={isCodeVerified} // 인증 완료되면 비활성화
              />
              <button
                id="btnAuthEmail"
                type="button"
                className="btn"
                onClick={handleVerifyCodeAndFindId} // 핸들러 연결
                disabled={isCodeVerified} // 인증 완료되면 비활성화
              >
                확인
              </button>
            </div>
            <div>
              <span className="result" style={{ color: messageColor }}>
                {message}
              </span>
            </div>
            {/* 아이디를 찾았을 경우에만 표시 */}
            {foundUserId && (
              <div className="result-id-box">
                <p>
                  당신의 아이디는{" "}
                  <span style={{ color: "blue", fontWeight: "bold" }}>
                    {foundUserId}
                  </span>{" "}
                  입니다.
                </p>
              </div>
            )}
            <div className="btn-container">
              <button
                type="button"
                className="btn cancel-btn"
                onClick={handleCancel}
              >
                취소
              </button>
              {/* 아이디 찾기 버튼은 이제 폼의 submit 버튼으로 작동하며, 주로 메시지를 업데이트하는 역할 */}
              <button
                type="submit"
                className="btn login-btn"
                disabled={!isFindingId} // 아이디가 찾아졌을 때만 활성화 (선택적)
              >
                아이디 확인 완료
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
