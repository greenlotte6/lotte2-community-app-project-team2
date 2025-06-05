// 아이디 중복 체크 (서버 연동 전 간단 모킹)
export const checkId = (id) => {
  if (!id) {
    return { valid: false, msg: "아이디를 입력해주세요.", color: "gray" };
  }
  if (id === "testuser") {
    return { valid: false, msg: "이미 존재하는 아이디입니다.", color: "red" };
  }
  return { valid: true, msg: "사용 가능한 아이디입니다.", color: "green" };
};

// 이메일 형식 검사
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return { valid: false, msg: "이메일을 입력해주세요.", color: "gray" };
  }
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      msg: "올바른 이메일 형식이 아닙니다.",
      color: "red",
    };
  }
  return { valid: true, msg: "이메일 형식이 올바릅니다.", color: "green" };
};

// 이메일 인증번호 발송 (모킹)
export const sendEmailCode = (email) => {
  // 실제 API 연동 시 여기에 요청
  const { valid } = validateEmail(email);
  if (!valid) {
    return { success: false, msg: "올바른 이메일을 입력해주세요." };
  }
  return { success: true, msg: "인증번호가 이메일로 전송되었습니다." };
};

// 인증번호 검증 (모킹)
export const verifyCode = (code) => {
  if (code === "123456") {
    return { success: true, msg: "인증 성공!" };
  }
  return { success: false, msg: "인증 실패. 다시 시도하세요." };
};
