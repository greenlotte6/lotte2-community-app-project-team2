document.addEventListener("DOMContentLoaded", () => {
  // 🔹 1. 변경 링크 클릭 시 입력 필드로 전환
  document.querySelectorAll(".change-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const valueSpan = e.target.closest(".value");
      const label = valueSpan.getAttribute("data-label") || "";
      const originalValue = valueSpan.querySelector(".value-text")
        ? valueSpan.querySelector(".value-text").textContent.trim()
        : valueSpan.childNodes[0].nodeValue.trim();

      if (valueSpan.querySelector("input")) return;

      const input = document.createElement("input");
      input.type = label === "비밀번호" ? "password" : "text";
      input.value = originalValue;
      input.className = "edit-input";

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "저장";
      saveBtn.className = "save-btn";

      valueSpan.innerHTML = "";
      valueSpan.appendChild(input);
      valueSpan.appendChild(saveBtn);

      saveBtn.addEventListener("click", () => {
        const newValue = input.value.trim() || originalValue;
        const displayValue =
          label === "비밀번호" ? "•".repeat(newValue.length) : newValue;

        valueSpan.innerHTML = `
            <span class="value-text">${displayValue}</span>
            <a href="#" class="change-link">변경</a>
          `;

        valueSpan
          .querySelector(".change-link")
          .addEventListener("click", (e) => {
            e.preventDefault();
            e.target.dispatchEvent(new Event("click"));
          });
      });
    });
  });

  // 🔹 2. 프로필 이미지 클릭 시 input[type="file"] 열기
  const fileInput = document.getElementById("profileImageInput");
  const profileImg = document.querySelector(".profile-img");

  profileImg.addEventListener("click", () => {
    fileInput.click();
  });

  // 🔹 3. 이미지 선택 시 미리보기
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (event) {
        profileImg.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert("이미지 파일을 선택해주세요.");
    }
  });
});
