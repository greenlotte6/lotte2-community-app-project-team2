import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserLogout } from "../../api/userAPI";
import useAuth from "../../hooks/useAuth";
import { getMyPage } from "../../api/myPageAPI";

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

  const navigate = useNavigate();
  const { username, logout } = useAuth();

  // 로그아웃
  const logoutHandler = () => {
    // 로그아웃 서버 요청
    const fetchData = async () => {
      try {
        const data = await getUserLogout();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    // 호출
    fetchData();

    // 로그아웃 처리
    logout();

    // 로그인 이동
    navigate("/user/login");
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMyPage();
        setUser(data);
      } catch (err) {
        console.error("사용자 정보 불러오기 실패:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="info-container">
      <div className="info-box">
        <h1>내 정보..</h1>

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
            <h2 className="user-name">{user?.name}</h2>
            <p className="user-position">
              {user?.department} / {user?.position}
            </p>
            <Link onClick={logoutHandler}>로그아웃 |</Link>
          </div>
        </div>

        <div className="info-table">
          <div className="info-row">
            <span className="label">연락처</span>
            <span className="value" data-label="연락처">
              <span className="value-text">{user?.hp}</span>
              <Link to="#" className="change-link">
                변경
              </Link>
            </span>
          </div>
          <div className="info-row">
            <span className="label">이메일</span>
            <span className="value">
              <span className="value-text">{user?.email}</span>
              <Link to="#" className="change-link">
                변경
              </Link>
            </span>
          </div>
          <div className="info-row">
            <span className="label">비밀번호</span>
            <span className="value">
              <span className="value-text">{"•".repeat(8)}</span> // 비밀번호는
              보안상 직접 표시 X
              <Link to="#" className="change-link">
                변경
              </Link>
            </span>
          </div>
          <div className="info-row">
            <span className="label">가입일</span>
            <span className="value">{user?.regDate?.substring(0, 10)}</span>
          </div>
          <div className="info-row">
            <span className="label">상태</span>
            <span className="value">{user?.status}</span>
          </div>
          <div className="info-row">
            <span className="label">권한</span>
            <span className="value">{user?.role?.replace("ROLE_", "")}</span>
          </div>
          <div className="info-row">
            <span className="label">멤버십</span>
            <span className="value">{user?.membership}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
