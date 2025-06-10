import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const MyPage = () => {
  useEffect(() => {
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
  }, []); // 빈 배열을 넣어서 컴포넌트가 처음 마운트될 때만 실행되도록 함

  return (
    <div className="info-container">
      <div className="info-box">
        <h1>내 정보</h1>

        <div className="profile-section">
          <img
            src="/images/Avatar.png"
            alt="프로필 사진"
            className="profile-img"
          />
          <div className="profile-edit">
            <button style={{ display: "none" }} className="edit-photo-btn">
              프로필 사진 수정
            </button>
            <input
              type="file"
              accept="image/*"
              id="profileImageInput"
              className="hidden"
            />
          </div>

          <div className="profile-basic">
            <h2 className="user-name">홍길동</h2>
            <p className="user-position">개발팀 / 주임</p>
          </div>
        </div>

        <div className="info-table">
          <div className="info-row">
            <span className="label">연락처</span>
            <span className="value" data-label="연락처">
              <span className="value-text">010-1234-5678</span>
              <Link to="#" className="change-link">
                변경
              </Link>
            </span>
          </div>
          <div className="info-row">
            <span className="label">이메일</span>
            <span className="value">
              <span className="value-text">hong@linkon.com</span>
              <Link to="#" className="change-link">
                변경
              </Link>
            </span>
          </div>
          <div className="info-row">
            <span className="label">비밀번호</span>
            <span className="value">
              <span className="value-text">••••••••</span>
              <Link to="#" className="change-link">
                변경
              </Link>
            </span>
          </div>
          <div className="info-row">
            <span className="label">주소</span>
            <span className="value">
              <span className="value-text">서울특별시 강남구 테헤란로 123</span>
              <Link to="#" className="change-link">
                변경
              </Link>
            </span>
          </div>
          <div className="info-row">
            <span className="label">가입일</span>
            <span className="value">2023-04-15</span>
          </div>
          <div className="info-row">
            <span className="label">상태</span>
            <span className="value">재직중</span>
          </div>
          <div className="info-row">
            <span className="label">권한</span>
            <span className="value">관리자</span>
          </div>
          <div className="info-row">
            <span className="label">멤버십</span>
            <span className="value">Premium</span>
          </div>
        </div>
      </div>
    </div>
  );
};
