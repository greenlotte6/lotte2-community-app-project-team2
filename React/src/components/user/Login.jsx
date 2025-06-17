import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { postUserLogin } from "../../api/userAPI";

const initState = {
  uid: "",
  pass: "",
};

export const Login = () => {
  const [user, setUser] = useState({ ...initState });

  const { login } = useAuth();

  const navigate = useNavigate();

  // 핸들러
  const changeHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // 서버 요청 정의
    const fetchData = async () => {
      try {
        // 로그인
        const data = await postUserLogin(user);
        console.log(data);

        if (data.username && data.accessToken) {
          // ✅ JWT 저장 (로컬 스토리지 또는 메모리)
          localStorage.setItem("access_token", data.accessToken);
          localStorage.setItem("user_name", data.name);
          // redux login 호출
          //dispatch(login(data));

          // context login 호출
          login(data.username);

          // 메인 이동(컴포넌트 라우팅)
          navigate("/myPage/myPage");
        }
      } catch (err) {
        console.error(err);
      }
    };

    // 호출
    fetchData();
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

        <form onSubmit={submitHandler}>
          <div className="input-group">
            <input
              type="text"
              id="email"
              name="uid"
              value={user.uid}
              onChange={changeHandler}
              placeholder="아이디"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              name="pass"
              value={user.pass}
              onChange={changeHandler}
              placeholder="비밀번호"
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> 자동로그인
            </label>
            <div className="find-links">
              <Link to="/user/findId">아이디찾기</Link> /
              <Link to="/user/findPassword">비밀번호 찾기</Link>
            </div>
          </div>

          <button type="submit" className="login-btn" value="로그인">
            로그인
          </button>
        </form>

        <div className="divider">또는</div>

        <div className="social-login">
          <button className="google">G 구글</button>
          <button className="naver">네이버</button>
          <button className="kakao">카카오톡</button>
        </div>

        <div className="signup">
          <Link to="/user/terms">회원가입</Link>
        </div>
      </div>
    </div>
  );
};
