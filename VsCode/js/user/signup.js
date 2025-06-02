function checkId() {
  const id = document.getElementById("id").value;
  const msg = document.getElementById("id-msg");

  // 실제로는 fetch 또는 axios로 서버에 확인 요청
  if (id === "testuser") {
    msg.textContent = "이미 존재하는 아이디입니다.";
    msg.style.color = "red";
  } else if (id) {
    msg.textContent = "사용 가능한 아이디입니다.";
    msg.style.color = "green";
  } else {
    msg.textContent = "아이디를 입력해주세요.";
    msg.style.color = "gray";
  }
}

function sendEmailCode() {
  const email = document.getElementById("email").value;
  const msg = document.getElementById("email-msg");
  const verification = document.getElementById("email-verification");

  if (email.includes("@")) {
    // 이메일 유효하다고 가정
    verification.style.display = "flex";
    msg.textContent = "인증번호가 이메일로 전송되었습니다.";
    msg.style.color = "green";
  } else {
    msg.textContent = "올바른 이메일을 입력해주세요.";
    msg.style.color = "red";
  }
}

function verifyCode() {
  const code = document.getElementById("email-code").value;
  const msg = document.getElementById("email-msg");

  if (code === "123456") {
    msg.textContent = "인증 성공!";
    msg.style.color = "green";
  } else {
    msg.textContent = "인증 실패. 다시 시도하세요.";
    msg.style.color = "red";
  }
}
