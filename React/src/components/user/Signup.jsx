import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUserDuplicate, postUser } from "../../api/userAPI";

// 정규표현식
const reUid = /^[a-z]+[a-z0-9]{4,19}$/g;
const rePass =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{5,16}$/;
const reName = /^[가-힣]{2,10}$/;
const reHp = /^01(?:0|1|[6-9])-(?:\d{4})-\d{4}$/;
const reEmail =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

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

  const [idMsg, setIdMsg] = useState({ text: "", color: "gray" });
  const [passMsg, setPassMsg] = useState({ text: "", color: "gray" });
  const [nameMsg, setNameMsg] = useState({ text: "", color: "gray" });
  const [hpMsg, setHpMsg] = useState({ text: "", color: "gray" });
  const [emailMsg, setEmailMsg] = useState({ text: "", color: "gray" });

  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [emailCodeInput, setEmailCodeInput] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const [isUidOk, setIsUidOk] = useState(false);
  const [isPassOk, setIsPassOk] = useState(false);
  const [isNameOk, setIsNameOk] = useState(false);
  const [isHpOk, setIsHpOk] = useState(false);
  const [isEmailOk, setIsEmailOk] = useState(false);

  // 비밀번호 유효성 검사를 위한 별도의 함수
  // 최신 user 상태를 기반으로 유효성 검사 수행
  const validatePassword = (currentPass, currentPass2) => {
    if (!rePass.test(currentPass)) {
      setPassMsg({
        text: "비밀번호는 영문/숫자/특수문자 포함 5~16자",
        color: "red",
      });
      setIsPassOk(false);
    } else if (currentPass !== currentPass2) {
      setPassMsg({ text: "비밀번호가 일치하지 않습니다.", color: "red" });
      setIsPassOk(false);
    } else {
      setPassMsg({ text: "사용 가능한 비밀번호입니다.", color: "green" });
      setIsPassOk(true);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    // 일단 현재 입력 값을 포함하여 user 상태를 업데이트
    setUser((prev) => {
      const newUser = { ...prev, [name]: value };

      // 비밀번호 관련 필드 변경 시 유효성 검사
      if (name === "pass" || name === "pass2") {
        // 업데이트된 user 객체를 기반으로 비밀번호 유효성 검사 함수 호출
        validatePassword(newUser.pass, newUser.pass2);
      } else if (name === "uid") {
        setIsUidOk(false);
        setIdMsg({ text: "", color: "gray" });
      } else if (name === "name") {
        if (!reName.test(value)) {
          setNameMsg({ text: "이름 형식이 올바르지 않습니다.", color: "red" });
          setIsNameOk(false);
        } else {
          setNameMsg({ text: "", color: "gray" });
          setIsNameOk(true);
        }
      } else if (name === "hp") {
        if (!reHp.test(value)) {
          setHpMsg({ text: "휴대폰 형식이 올바르지 않습니다.", color: "red" });
          setIsHpOk(false);
        } else {
          setHpMsg({ text: "유효한 휴대폰 번호입니다.", color: "green" });
          setIsHpOk(true);
        }
      }
      return newUser; // 업데이트된 상태 반환
    });
  };

  const handleCheckId = async () => {
    if (!user.uid.match(reUid)) {
      setIdMsg({ text: "아이디 형식이 올바르지 않습니다.", color: "red" });
      return;
    }

    const result = await checkUserDuplicate("uid", user.uid);
    setIdMsg({ text: result.msg, color: result.color });
    setIsUidOk(result.color === "green");
  };

  const handleCheckEmail = async () => {
    if (!reEmail.test(user.email)) {
      setEmailMsg({ text: "이메일 형식이 올바르지 않습니다.", color: "red" });
      setIsEmailOk(false);
      return;
    }

    const result = await checkUserDuplicate("email", user.email);
    setEmailMsg({ text: result.msg, color: result.color });

    if (result.valid) {
      // result.valid가 true일 때만 인증 프로세스 진행
      setShowEmailVerification(true);
      // 이메일 인증 코드를 전송하는 API 호출이 여기에 와야 합니다.
      setEmailMsg({ text: "인증번호를 전송했습니다.", color: "green" }); // 임시 메시지
      setEmailVerified(false); // 인증되지 않은 상태로 초기화
      setIsEmailOk(false); // 이메일 인증 완료 전까지는 false
    } else {
      // 중복이거나 유효하지 않은 경우
      setEmailMsg({ text: result.msg, color: result.color });
      setIsEmailOk(false);
    }
  };

  const handleSendEmailCode = () => {
    if (!reEmail.test(user.email)) {
      setEmailMsg({ text: "이메일 형식이 올바르지 않습니다.", color: "red" });
      setIsEmailOk(false);
      return;
    }

    // 실제 이메일 인증 코드 전송 API 호출이 여기에 와야 합니다.
    // 예: sendVerificationCode(user.email);

    setEmailMsg({ text: "인증번호를 전송했습니다.", color: "green" });
    setShowEmailVerification(true);
    setEmailVerified(false);
    setIsEmailOk(false);
  };

  const handleVerifyCode = () => {
    if (emailCodeInput === "123456") {
      // 테스트용 코드
      setEmailMsg({ text: "이메일이 인증되었습니다.", color: "green" });
      setEmailVerified(true);
      setIsEmailOk(true);
    } else {
      setEmailMsg({ text: "인증번호가 올바르지 않습니다.", color: "red" });
      setEmailVerified(false);
      setIsEmailOk(false);
    }
  };

  const handleCheckHp = async () => {
    if (!reHp.test(user.hp)) {
      setHpMsg({ text: "휴대폰 형식이 올바르지 않습니다.", color: "red" });
      setIsHpOk(false);
      return;
    }

    const result = await checkUserDuplicate("hp", user.hp);
    setHpMsg({ text: result.msg, color: result.color });
    setIsHpOk(result.valid);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // 마지막 유효성 검사
    // 비밀번호 필드가 변경될 때마다 validatePassword가 호출되므로, 최종 isPassOk 상태만 확인
    if (!isUidOk) {
      alert("아이디 중복 확인이 필요합니다.");
      return;
    }
    if (!isPassOk) {
      alert("비밀번호를 확인해주세요.");
      return;
    }
    if (!isNameOk) {
      alert("이름을 확인해주세요.");
      return;
    }
    if (!isHpOk) {
      alert("휴대폰 번호 중복 확인이 필요합니다."); // 메시지 수정
      return;
    }
    if (!isEmailOk) {
      alert("이메일 인증이 필요합니다.");
      return;
    }

    try {
      const data = await postUser(user);
      alert("회원가입 완료");
      navigate("/user/login");
    } catch (err) {
      console.error(err);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
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
          {/* 아이디 */}
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

          {/* 비밀번호 */}
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
            <p className="message" style={{ color: passMsg.color }}>
              {passMsg.text}
            </p>
          </div>

          {/* 이름 */}
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={changeHandler}
              placeholder="이름 입력"
            />
            <p className="message" style={{ color: nameMsg.color }}>
              {nameMsg.text}
            </p>
          </div>

          {/* 휴대폰 */}
          <div className="input-group">
            <label htmlFor="phone">휴대폰</label>
            <div className="input-with-button">
              <input
                type="text"
                id="phone"
                name="hp"
                value={user.hp}
                onChange={changeHandler}
                placeholder="010-0000-0000"
              />
              <button
                type="button"
                className="check-btn"
                onClick={handleCheckHp}
              >
                중복확인
              </button>
            </div>
            <p className="message" style={{ color: hpMsg.color }}>
              {hpMsg.text}
            </p>
          </div>

          {/* 이메일 */}
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
                onClick={handleCheckEmail} // 이메일 중복 확인 및 인증번호 전송
              >
                인증
              </button>
            </div>
            {showEmailVerification && (
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <input
                  type="text"
                  placeholder="인증번호 입력"
                  value={emailCodeInput}
                  onChange={(e) => setEmailCodeInput(e.target.value)}
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
