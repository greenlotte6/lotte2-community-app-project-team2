import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Context에서 사용하는 상태값
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // 쿠키에서 username 가져오기
    const username = Cookies.get("username");

    // 쿠키값이 존재하면 Context username 초기화
    if (username) {
      setUsername(username);
    }
  }, []);

  const login = (username) => {
    // Context username 초기화
    setUsername(username);

    // 쿠키 저장
    Cookies.set("username", username);
  };

  const logout = () => {
    setUsername(null);
    Cookies.remove("username");
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
