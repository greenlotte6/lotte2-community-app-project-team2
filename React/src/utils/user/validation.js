// 정규표현식
const reUid = /^[a-z]+[a-z0-9]{4,19}$/g;
const rePass =
  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
const reName = /^[가-힣]{2,10}$/;
const reEmail =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const reHp = /^01(?:0|1|[6-9])-(?:\d{4})-\d{4}$/;

// 아이디 형식 검사 (서버 중복 확인 전에 사용 가능)
export const validateUid = (id) => {
  if (!id) {
    return { valid: false, msg: "아이디를 입력해주세요.", color: "gray" };
  }
  if (!reUid.test(id)) {
    return { valid: false, msg: "영문 시작, 5~20자 입력하세요.", color: "red" };
  }
  return { valid: true, msg: "", color: "green" };
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
