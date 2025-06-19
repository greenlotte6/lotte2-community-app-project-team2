import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// axios는 이제 API 함수 내에서 사용되므로 여기서는 직접 임포트하지 않아도 됩니다.
// import axios from "axios";

import { fetchMembershipByNo, processCheckout } from "../../api/membershipAPI"; // 멤버십 상세 정보 API
import { getMyPage } from "../../api/myPageAPI"; // 마이페이지 정보 (사용자 정보 포함) API

export const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. 사용자 정보 (이름, 이메일, 연락처) 상태
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    hp: "",
    uid: "", // 사용자의 UID를 추가 (결제 요청 시 user_Uid로 보낼 것)
  });

  // 2. 선택된 멤버십 정보 (플랜명, 가격, 고유 번호 등) 상태
  const [selectedMembership, setSelectedMembership] = useState(null);

  // 3. 결제 폼 입력 데이터 상태 (카드 정보 등)
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber1: "", // 카드 번호 앞 4자리
    cardNumber2: "", // 카드 번호 중간 4자리
    cardNumber3: "", // 카드 번호 중간 4자리
    cardNumber4: "", // 카드 번호 뒤 4자리
    expiryMonth: "", // 유효 기간 월 (MM)
    expiryYear: "", // 유효 기간 연도 (YY)
  });

  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태
  const [errorMessage, setErrorMessage] = useState(null); // 에러 메시지 상태

  // URL 쿼리 파라미터에서 membershipNo를 가져옵니다. (예: /checkout?membershipNo=1)
  const queryParams = new URLSearchParams(location.search);
  const membershipNoParam = queryParams.get("membershipNo"); // URL에서 넘어온 멤버십 번호 (문자열)

  // 컴포넌트 마운트 시 (또는 멤버십 번호가 변경될 때) 필요한 데이터를 로드합니다.
  useEffect(() => {
    const loadCheckoutData = async () => {
      setIsLoading(true);
      setErrorMessage(null); // 새로운 로드 시 에러 메시지 초기화

      // --- 1단계: 멤버십 번호 유효성 검사 및 멤버십 정보 로드 ---
      // membershipNoParam이 없거나, 숫자로 변환할 수 없는 경우 (NaN)
      if (!membershipNoParam || isNaN(parseInt(membershipNoParam))) {
        console.error(
          "URL에 유효한 멤버십 번호가 없습니다:",
          membershipNoParam
        );
        setErrorMessage(
          "잘못된 멤버십 접근입니다. 멤버십 선택 페이지로 이동합니다."
        );
        navigate("/membership/membership"); // 유효하지 않으면 즉시 멤버십 페이지로 리다이렉트
        setIsLoading(false); // 로딩 중단
        return; // 함수 실행 중단
      }

      const parsedMembershipNo = parseInt(membershipNoParam); // 문자열을 정수로 변환

      try {
        const membershipData = await fetchMembershipByNo(parsedMembershipNo); // 멤버십 상세 정보 API 호출
        setSelectedMembership(membershipData); // 선택된 멤버십 데이터 상태 업데이트
      } catch (error) {
        console.error("멤버십 상세 정보를 불러오는 중 오류 발생:", error);
        setErrorMessage(
          "선택된 멤버십 정보를 불러오는 데 실패했습니다. 다시 시도해주세요."
        );
        navigate("/membership/membership"); // 실패 시 멤버십 페이지로 리다이렉트
        setIsLoading(false); // 로딩 중단
        return;
      }

      // --- 2단계: 로그인된 사용자 정보 로드 (getMyPage API 활용) ---
      try {
        const userDetail = await getMyPage(); // 마이페이지 정보 API 호출 (사용자 정보 포함)
        if (userDetail) {
          setUserData({
            name: userDetail.name || "",
            email: userDetail.email || "",
            hp: userDetail.hp || "",
            uid: userDetail.uid || "", // UserDetailDTO에 uid 필드가 있다면 가져옴
          });
        } else {
          // getMyPage가 null을 반환했거나 사용자 정보가 없는 경우
          setErrorMessage(
            "사용자 정보를 불러오는 데 실패했습니다. 다시 로그인해주세요."
          );
          navigate("/user/login"); // 로그인 페이지로 리다이렉트
        }
      } catch (error) {
        // getMyPage API 호출 자체에서 에러 발생 시 (예: 네트워크 오류, 401 Unauthorized)
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
        setErrorMessage(
          "사용자 정보를 불러오는 데 실패했습니다. 다시 로그인해주세요."
        );
        navigate("/user/login"); // 로그인 페이지로 리다이렉트
      } finally {
        setIsLoading(false); // 모든 데이터 로드 완료 후 로딩 종료
      }
    };

    loadCheckoutData();
  }, [membershipNoParam, navigate]); // URL의 멤버십 번호나 navigate 함수가 변경될 때 다시 실행

  // 폼 입력 필드 변경 핸들러 (카드 정보 등)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // '결제하기' 버튼 클릭 시 호출될 함수
  const handlePaymentSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작(페이지 새로고침) 방지

    // 필수 데이터가 모두 로드되었는지 확인
    if (!userData.uid || !selectedMembership) {
      alert(
        "결제에 필요한 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }

    // 카드 번호 4자리씩 입력된 것을 하나의 문자열로 합칩니다.
    const fullCardNumber = `${formData.cardNumber1}${formData.cardNumber2}${formData.cardNumber3}${formData.cardNumber4}`;
    // 유효 기간을 'MM/YY' 형식으로 조합합니다.
    const fullExpiryDate = `${formData.expiryMonth}/${formData.expiryYear}`;

    // 백엔드 CheckoutDTO의 필드명(스네이크 케이스 포함)에 맞춰 데이터를 구성합니다.
    const checkoutRequestData = {
      user_Uid: userData.uid, // 백엔드 CheckoutDTO의 user_Uid 필드와 일치
      membership_No: selectedMembership.no, // 백엔드 CheckoutDTO의 membership_No 필드와 일치
      name: userData.name, // 사용자 이름
      email: userData.email, // 사용자 이메일
      hp: userData.hp, // 사용자 연락처
      cardName: formData.cardName,
      cardNumber: fullCardNumber,
      expiryDate: fullExpiryDate,
      amount: selectedMembership.price, // 멤버십 가격 (DB에서 온 가격 사용)
      status: "PENDING", // 초기 결제 상태를 'PENDING'으로 설정 (백엔드에서 'SUCCESS'로 변경)
      // paymentDate 필드는 백엔드에서 @CreationTimestamp로 자동 생성됩니다.
    };

    console.log("결제 요청 데이터 (CheckoutDTO):", checkoutRequestData);

    try {
      // processCheckout API 함수 호출 (POST 요청)
      const response = await processCheckout(checkoutRequestData);
      alert("결제가 성공적으로 처리되었습니다. 멤버십이 업데이트됩니다!");
      console.log("결제 응답:", response);
      navigate("/myPage/myPage"); // 결제 성공 후 마이페이지로 이동
    } catch (error) {
      console.error(
        "결제 처리 중 오류 발생:",
        error.response?.data || error.message
      );
      alert(
        `결제 처리 중 오류가 발생했습니다: ${
          error.response?.data || error.message
        }`
      );
    }
  };

  // --- 로딩 중 상태 UI ---
  if (isLoading) {
    return (
      <div
        className="checkout-container"
        style={{ textAlign: "center", padding: "50px" }}
      >
        <h1>결제 정보를 불러오는 중...</h1>
        <p>잠시만 기다려 주세요.</p>
      </div>
    );
  }

  // --- 에러 메시지 표시 UI ---
  if (errorMessage) {
    return (
      <div
        className="checkout-container"
        style={{ textAlign: "center", padding: "50px", color: "red" }}
      >
        <h1>오류 발생!</h1>
        <p>{errorMessage}</p>
        <button onClick={() => navigate("/membership/membership")}>
          멤버십 선택 페이지로 이동
        </button>
      </div>
    );
  }

  // --- 필수 데이터가 로드되지 않았을 때의 UI (위의 isLoading/errorMessage로 대부분 처리됨) ---
  // 이 조건은 거의 발생하지 않지만, 만약을 위해 남겨둡니다.
  if (!userData.uid || !selectedMembership) {
    return (
      <div
        className="checkout-container"
        style={{ textAlign: "center", padding: "50px" }}
      >
        <h1>필수 정보를 불러올 수 없습니다.</h1>
        <p>로그인 상태를 확인하거나, 페이지를 새로고침해주세요.</p>
        <button onClick={() => navigate("/membership/membership")}>
          멤버십 선택 페이지로 이동
        </button>
      </div>
    );
  }

  return (
    <section className="checkout-container">
      <h2 className="section-title">주문자 정보</h2>
      <div className="checkout-wrapper">
        <div className="checkout-form">
          <label>
            이름{" "}
            <input
              type="text"
              name="name" // 이름 필드에 name 추가 (선택적)
              value={userData.name} // DB에서 가져온 이름
              readOnly // 읽기 전용으로 설정하여 수정 불가
              placeholder="이름 입력"
            />
          </label>
          <label>
            이메일{" "}
            <input
              type="email"
              name="email" // 이메일 필드에 name 추가 (선택적)
              value={userData.email} // DB에서 가져온 이메일
              readOnly // 읽기 전용으로 설정
              placeholder="이메일 입력"
            />
          </label>
          <label>
            연락처{" "}
            <input
              type="tel"
              name="hp" // 연락처 필드에 name 추가 (선택적)
              value={userData.hp} // DB에서 가져온 연락처
              readOnly // 읽기 전용으로 설정
              placeholder="연락처 입력"
            />
          </label>

          <label>
            결제정보
            <select
              name="cardName" // select 요소에 name 속성 추가
              value={formData.cardName} // formData 상태와 연결
              onChange={handleChange} // 변경 시 handleChange 호출
              required // 필수 입력 필드
            >
              <option disabled value="">
                {" "}
                {/* 기본 선택 옵션 */}
                카드 선택
              </option>
              <option value="신한카드">신한카드</option>
              <option value="국민카드">국민카드</option>
              <option value="삼성카드">삼성카드</option>
              {/* 필요한 다른 카드사 옵션 추가 */}
            </select>
          </label>

          <div className="card-info">
            <label>카드번호 입력</label>
            <div className="card-number">
              <input
                type="text"
                name="cardNumber1"
                maxLength="4"
                value={formData.cardNumber1}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cardNumber2"
                maxLength="4"
                value={formData.cardNumber2}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cardNumber3"
                maxLength="4"
                value={formData.cardNumber3}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cardNumber4"
                maxLength="4"
                value={formData.cardNumber4}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="expiry-info">
            <label>유효 기간</label>
            <div className="expiry-date">
              <input
                type="text"
                name="expiryMonth"
                maxLength="2"
                placeholder="MM"
                value={formData.expiryMonth}
                onChange={handleChange}
                required
              />
              <span>/</span>
              <input
                type="text"
                name="expiryYear"
                maxLength="2"
                placeholder="YY"
                value={formData.expiryYear}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="checkout-summary">
          <h3>상품 정보</h3>
          {/* 선택된 멤버십 정보를 동적으로 출력 */}
          <p className="cost-label">플랜명: {selectedMembership.membership}</p>
          <p className="cost-value">
            ₩{selectedMembership.price.toLocaleString()}
          </p>
          <button
            type="submit"
            className="pay-btn"
            onClick={handlePaymentSubmit}
          >
            결제 하기
          </button>{" "}
          {/* 버튼 클릭 시 결제 처리 함수 호출 */}
        </div>
      </div>
    </section>
  );
};
