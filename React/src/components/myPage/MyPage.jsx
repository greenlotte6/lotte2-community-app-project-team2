import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserLogout } from "../../api/userAPI";
import useAuth from "../../hooks/useAuth"; // 이 훅이 올바르게 구현되어 있어야 합니다.
import { getMyPage, updateMyPage } from "../../api/myPageAPI";

export const MyPage = () => {
  const [user, setUser] = useState(null); // 사용자 정보를 상태로 관리
  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태

  const navigate = useNavigate();
  const { username, logout } = useAuth(); // 인증 정보 (로그인 사용자 이름 등)

  // 1. 사용자 정보를 불러오는 useEffect
  // 컴포넌트가 처음 마운트될 때 한 번만 실행됩니다.
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true); // 데이터 로딩 시작
        const data = await getMyPage(); // 서버에서 사용자 정보 가져오기
        if (data) {
          setUser(data); // 성공적으로 가져오면 user 상태 업데이트
        } else {
          console.warn(
            "서버로부터 받은 사용자 정보가 유효하지 않습니다:",
            data
          );
          // 사용자에게 알림을 주거나, 로그인 페이지로 리다이렉트할 수 있습니다.
          alert("사용자 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.");
          navigate("/user/login"); // 예시: 로그인 페이지로 강제 이동
        }
      } catch (err) {
        console.error("사용자 정보 불러오기 실패:", err);
        alert(
          "사용자 정보를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요."
        );
        navigate("/user/login"); // 예시: 로그인 페이지로 강제 이동
      } finally {
        setIsLoading(false); // 데이터 로딩 완료
      }
    };

    fetchUser();
  }, [navigate]); // navigate가 변경될 일은 거의 없지만, lint 경고를 피하기 위해 추가

  // 2. DOM 조작 및 이벤트 리스너를 관리하는 useEffect
  // user 데이터가 로드되거나 (isLoading이 false가 되거나) 변경될 때마다 실행됩니다.
  useEffect(() => {
    // user 데이터가 아직 없거나 로딩 중이면 DOM 요소가 완전히 렌더링되지 않았을 수 있으므로
    // 이펙트를 실행하지 않고 즉시 종료합니다.
    if (!user || isLoading) {
      return;
    }

    // --- "변경" 링크 클릭 시 입력 필드로 전환 및 저장 로직 ---
    const attachChangeLinkListeners = () => {
      // 모든 "변경" 링크 요소를 찾습니다.
      const changeLinks = document.querySelectorAll(".change-link");

      // 각 링크에 이벤트 리스너를 추가합니다.
      changeLinks.forEach((link) => {
        // 중요한 부분: 기존에 이벤트 리스너가 중복해서 붙는 것을 방지
        // `link.onclick = null;`은 기존의 인라인 onclick 핸들러를 제거하는 데 유용합니다.
        // `addEventListener`의 경우, `removeEventListener`를 호출할 수 있도록
        // 이벤트 핸들러 함수를 변수에 할당하여 관리하는 것이 좋습니다.
        // 여기서는 `addEventListener`를 계속 붙여도 이전 DOM은 사라지고 새로 생성되므로
        // 큰 문제는 없지만, 명시적인 제거 로직이 더 안전합니다.
        // 단순화를 위해 DOM이 재구축될 때마다 새롭게 리스너가 붙는다고 가정합니다.

        // 이벤트 리스너가 한 번만 실행되도록 콜백 함수를 래핑
        // 이펙트가 다시 실행될 때마다 기존 리스너가 제거되고 새로운 리스너가 추가되도록 설계합니다.
        const handler = function (e) {
          e.preventDefault(); // 기본 링크 동작(페이지 이동) 방지

          const valueSpan = e.target.closest(".value");
          if (!valueSpan) return; // `.value` 부모 요소가 없으면 중단

          const label = valueSpan.getAttribute("data-label") || "";
          // `.value-text` 요소가 없을 경우에도 안전하게 텍스트를 가져오거나 빈 문자열로 초기화
          const originalValue =
            valueSpan.querySelector(".value-text")?.textContent.trim() || "";

          if (valueSpan.querySelector("input")) return; // 이미 입력 필드가 있다면 다시 만들지 않음

          // 새로운 입력 필드 생성
          const input = document.createElement("input");
          input.type = label === "비밀번호" ? "password" : "text";
          input.value = originalValue;
          input.className = "edit-input"; // 스타일링을 위한 클래스

          // "저장" 버튼 생성
          const saveBtn = document.createElement("button");
          saveBtn.textContent = "저장";
          saveBtn.className = "save-btn"; // 스타일링을 위한 클래스

          // 기존 내용을 지우고 입력 필드와 저장 버튼 추가
          valueSpan.innerHTML = "";
          valueSpan.appendChild(input);
          valueSpan.appendChild(saveBtn);

          // 저장 버튼 클릭 이벤트 리스너
          saveBtn.addEventListener("click", async () => {
            const newValue = input.value.trim(); // 입력된 새 값 가져오기
            const displayValue =
              label === "비밀번호" ? "•".repeat(newValue.length) : newValue;

            // 저장할 필드 이름 결정
            let fieldName = "";
            if (label === "연락처") fieldName = "hp";
            else if (label === "이메일") fieldName = "email";
            else if (label === "비밀번호") fieldName = "pass";

            // 필드 이름이 유효하고, 새로운 값이 있으며, 기존 값과 다를 때만 업데이트 호출
            if (fieldName && newValue && newValue !== originalValue) {
              await saveField(fieldName, newValue); // API 호출을 통해 서버에 저장
            } else if (fieldName && newValue === originalValue) {
              alert("변경된 내용이 없습니다."); // 변경이 없을 경우 알림
            } else if (!newValue) {
              alert("값을 입력해주세요."); // 값이 비어있을 경우 알림
            }

            // 업데이트 후 원래의 텍스트와 "변경" 링크 상태로 되돌리기
            valueSpan.innerHTML = `
              <span class="value-text">${displayValue}</span>
              <a href="#" class="change-link">변경</a>
            `;
            // 중요: 새로 생성된 "변경" 링크에 **다시** 이벤트 리스너를 붙여야 합니다.
            // DOM이 변경되었으므로 기존의 리스너는 유효하지 않습니다.
            const newLink = valueSpan.querySelector(".change-link");
            if (newLink) {
              newLink.addEventListener("click", handler); // 동일한 핸들러 재사용
            }
          });
        }; // handler 함수 끝

        link.addEventListener("click", handler);
      });
    }; // attachChangeLinkListeners 함수 끝

    // 사용자 데이터 로드 후 "변경" 링크에 이벤트 리스너 연결
    attachChangeLinkListeners();

    // --- 프로필 이미지 관련 로직 ---
    const fileInput = document.getElementById("profileImageInput");
    const profileImg = document.querySelector(".profile-img");

    if (profileImg && fileInput) {
      const clickHandler = () => fileInput.click();
      profileImg.addEventListener("click", clickHandler);

      const changeHandler = (e) => {
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
      };
      fileInput.addEventListener("change", changeHandler);

      // 클린업 함수: 컴포넌트 언마운트 시 또는 user/isLoading 상태 변경 시 기존 리스너 제거
      // 이펙트가 재실행될 때마다 이전 리스너를 제거하고 새롭게 등록합니다.
      return () => {
        profileImg.removeEventListener("click", clickHandler);
        fileInput.removeEventListener("change", changeHandler);
        // "변경" 링크 리스너도 제거 (좀 더 복잡할 수 있으나, 여기서는 DOM 재생성으로 간접적으로 처리)
        // 만약 'handler' 함수를 `useEffect` 바깥에 선언하여 참조할 수 있다면,
        // `link.removeEventListener("click", handler);` 와 같이 명시적으로 제거할 수 있습니다.
        // 현재는 `attachChangeLinkListeners`가 다시 실행되면서 새로운 리스너가 붙으므로
        // 이 부분은 간략화되어 있습니다.
      };
    }
  }, [user, isLoading]); // user 또는 isLoading 상태가 변경될 때마다 이펙트 재실행

  // 로그아웃 핸들러
  const logoutHandler = () => {
    const fetchData = async () => {
      try {
        await getUserLogout(); // 서버에 로그아웃 요청
        console.log("로그아웃 성공");
      } catch (err) {
        console.error("로그아웃 실패:", err);
      } finally {
        logout(); // useAuth 훅의 logout 함수 호출 (클라이언트 측 인증 상태 제거)
        navigate("/user/login"); // 로그인 페이지로 이동
      }
    };
    fetchData();
  };

  // 사용자 정보 업데이트 로직
  const saveField = async (fieldName, value) => {
    // user 상태가 아직 로드되지 않았다면 경고 후 중단
    if (!user) {
      console.error(
        "SaveField: user 상태가 null입니다. 데이터를 먼저 로드해야 합니다."
      );
      alert("사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 현재 user 정보와 변경할 필드 값을 합쳐 새로운 payload 생성
    const payload = {
      ...user, // 기존 user 정보 복사
      [fieldName]: value, // 변경하려는 필드만 새 값으로 덮어쓰기
    };

    // 비밀번호는 백엔드에서 다시 암호화되므로, 클라이언트에서는 평문으로 보냅니다.
    if (fieldName === "pass") {
      payload.pass = value;
    }

    try {
      // 서버에 업데이트 요청
      const updated = await updateMyPage(payload);
      setUser(updated); // 서버에서 반환된 최신 정보로 user 상태 업데이트
      alert("정보가 성공적으로 저장되었습니다!");
    } catch (err) {
      console.error("정보 업데이트 실패:", err);
      // 에러 메시지가 있다면 사용자에게 보여줍니다.
      alert(
        "정보 저장에 실패했습니다. 입력값을 확인해주세요." +
          (err.response?.data
            ? ` (${err.response.data.message || err.response.data})`
            : "")
      );
    }
  };

  // 로딩 중일 때 표시할 UI
  if (isLoading) {
    return (
      <div
        className="info-container"
        style={{ textAlign: "center", padding: "50px" }}
      >
        <h1>사용자 정보를 불러오는 중...</h1>
        <p>잠시만 기다려 주세요.</p>
      </div>
    );
  }

  // user 정보가 없으면 (로딩 실패 등) 표시할 UI
  if (!user) {
    return (
      <div
        className="info-container"
        style={{ textAlign: "center", padding: "50px" }}
      >
        <h1>사용자 정보를 불러올 수 없습니다.</h1>
        <p>페이지를 새로고침하거나 다시 로그인해 주세요.</p>
        <button onClick={() => navigate("/user/login")}>
          로그인 페이지로 이동
        </button>
      </div>
    );
  }

  // 사용자 정보가 성공적으로 로드되면 메인 UI 렌더링
  return (
    <div className="info-container">
      <div className="info-box">
        <h1>내 정보..</h1>

        <div className="profile-section">
          <img
            src="/images/Avatar.png" // 기본 아바타 이미지
            alt="프로필 사진"
            className="profile-img"
          />
          <div className="profile-edit">
            {/* 이 버튼은 display: "none"으로 숨겨져 있으므로 프로필 이미지를 직접 클릭하도록 유도 */}
            <button style={{ display: "none" }} className="edit-photo-btn">
              프로필 사진 수정
            </button>
            <input
              type="file"
              accept="image/*"
              id="profileImageInput"
              className="hidden" // CSS로 숨김
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
            <span className="value" data-label="이메일">
              <span className="value-text">{user?.email}</span>
              <Link to="#" className="change-link">
                변경
              </Link>
            </span>
          </div>
          <div className="info-row">
            <span className="label">비밀번호</span>
            <span className="value" data-label="비밀번호">
              {/* 비밀번호는 보안상 실제 값을 표시하지 않고 '•'로 대체 */}
              <span className="value-text">{"•".repeat(8)}</span>
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
            <span className="value">{user?.membership?.membership}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
