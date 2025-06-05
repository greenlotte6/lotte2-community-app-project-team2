import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postUser } from "../../api/userAPI";

const initState = {
  uid: "",
  pass: "",
  name: "",
  email: "",
  hp: "",
};

export const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ ...initState });

  // 핸들러
  const changeHandler = (e) => {
    e.preventDefault();

    // 입력 필드 변경시 상태 업데이트
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);

    // 서버 전송
    const fetchData = async () => {
      try {
        const data = await postUser(user);
        console.log(data);

        alert("등록 완료");

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
            <label for="id">아이디</label>
            <div className="input-with-button">
              <input
                type="text"
                name="uid"
                value={user.uid}
                id="id"
                onChange={changeHandler}
                placeholder="아이디 입력"
              />
              <button type="button" className="check-btn" onclick="checkId()">
                중복확인
              </button>
            </div>
            <p id="id-msg" className="message"></p>
          </div>
          <div className="input-group">
            <label for="pw">비밀번호</label>
            <input
              type="password"
              id="pw"
              name="pass"
              value={user.pass}
              onChange={changeHandler}
              placeholder="Placeholder"
            />
          </div>
          <div className="input-group">
            <label for="pw-check">비밀번호 확인</label>
            <input
              type="password"
              id="pw-check"
              name="pass2"
              placeholder="Placeholder"
            />
          </div>
          <div className="input-group">
            <label for="name">이름</label>
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
            <label for="phone">휴대폰</label>
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
            <label for="email">이메일</label>
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
            type="submit"
            className="signup-btn"
            onClick={() => navigate("/user/login")}
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
