import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUserDuplicate, postUser } from "../../api/userAPI";

// utils 함수 import
import {
  validateEmail,
  validateUid,
  sendEmailCode,
  verifyCode,
} from "../../utils/user/validation";

const initState = {
  uid: "",
  pass: "",
  pass2: "",
  name: "",
  email: "",
  hp: "",
};

export const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ ...initState });

  // 유효성 메시지 상태
  const [idMsg, setIdMsg] = useState({ text: "", color: "gray" });
  const [emailMsg, setEmailMsg] = useState({ text: "", color: "gray" });
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [emailCodeInput, setEmailCodeInput] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  // 입력 핸들러
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // 아이디 중복확인 버튼 클릭
  const handleCheckId = async () => {
    if (!user.uid) {
      setIdMsg({ text: "아이디를 입력해주세요.", color: "gray" });
      return;
    }

    const result = await checkUserDuplicate("uid", user.uid);
    setIdMsg({ text: result.msg, color: result.color });
  };

  // 이메일 인증번호 발송 버튼 클릭
  const handleSendEmailCode = () => {
    const result = sendEmailCode(user.email);
    setEmailMsg({ text: result.msg, color: result.success ? "green" : "red" });
    if (result.success) {
      setShowEmailVerification(true);
      setEmailVerified(false);
    } else {
      setShowEmailVerification(false);
    }
  };

  // 인증번호 입력 변화
  const handleEmailCodeChange = (e) => {
    setEmailCodeInput(e.target.value);
  };

  // 인증번호 확인 버튼 클릭
  const handleVerifyCode = () => {
    const result = verifyCode(emailCodeInput);
    setEmailMsg({ text: result.msg, color: result.success ? "green" : "red" });
    setEmailVerified(result.success);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // 기본 유효성 체크 (예: 아이디, 이메일 인증 등)
    if (!user.uid) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (idMsg.color !== "green") {
      alert("아이디 중복확인을 해주세요.");
      return;
    }
    if (!emailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    if (user.pass !== user.pass2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 추가 유효성 검사 필요시 여기 추가
    console.log(user);

    // 서버 전송
    const fetchData = async () => {
      try {
        const data = await postUser(user);
        console.log(data);

        alert("회원가입 완료");

        // 로그인 이동(컴포넌트 라우팅)
        navigate("/user/login");
      } catch (err) {
        console.error(err);
      }
    };

    // 호출
    fetchData();
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
          <h1>회원가입</h1>
        </div>

        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="id">아이디</label>
            <div className="input-with-button">
              <input
                type="text"
                name="uid"
                value={user.uid}
                id="id"
                onChange={changeHandler}
                placeholder="아이디 입력"
              />
              <button
                type="button"
                className="check-btn"
                onClick={handleCheckId}
              >
                중복확인
              </button>
            </div>
            <p className="message" style={{ color: idMsg.color }}>
              {idMsg.text}
            </p>
          </div>
          <div className="input-group">
            <label htmlFor="pw">비밀번호</label>
            <input
              type="password"
              id="pw"
              name="pass"
              value={user.pass}
              onChange={changeHandler}
              placeholder="비밀번호 입력"
            />
          </div>
          <div className="input-group">
            <label htmlFor="pw-check">비밀번호 확인</label>
            <input
              type="password"
              id="pw-check"
              name="pass2"
              value={user.pass2}
              onChange={changeHandler}
              placeholder="비밀번호 확인"
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={changeHandler}
              placeholder="Placeholder"
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">휴대폰</label>
            <input
              type="text"
              id="phone"
              name="hp"
              value={user.hp}
              onChange={changeHandler}
              placeholder="Placeholder"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <div className="input-with-button">
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={changeHandler}
                placeholder="이메일 입력"
              />
              <button
                type="button"
                className="check-btn"
                onClick={handleSendEmailCode}
              >
                인증
              </button>
            </div>
            {showEmailVerification && (
              <div
                id="email-verification"
                style={{ display: "flex", gap: "8px", marginTop: "8px" }}
              >
                <input
                  type="text"
                  id="email-code"
                  placeholder="인증번호 입력"
                  value={emailCodeInput}
                  onChange={handleEmailCodeChange}
                />
                <button
                  type="button"
                  className="check-btn"
                  onClick={handleVerifyCode}
                >
                  확인
                </button>
              </div>
            )}
            <p className="message" style={{ color: emailMsg.color }}>
              {emailMsg.text}
            </p>
          </div>

          <button type="submit" className="signup-btn">
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
