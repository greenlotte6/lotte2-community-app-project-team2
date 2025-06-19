import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMembershipPlans } from "../../api/membershipAPI"; // 멤버십 플랜 API
import { getMyPage } from "../../api/myPageAPI"; // 마이페이지 정보 (사용자 정보) API

export const Membership = () => {
  const navigate = useNavigate();
  const [membershipPlans, setMembershipPlans] = useState([]); // 모든 멤버십 플랜 목록
  const [isLoading, setIsLoading] = useState(true);
  const [currentMembershipNo, setCurrentMembershipNo] = useState(null); // 로그인된 사용자의 현재 멤버십 ID

  // 각 플랜에 해당하는 데이터 (초기값은 null) - UI 정렬을 위해 사용
  const [freePlan, setFreePlan] = useState(null);
  const [standardPlan, setStandardPlan] = useState(null);
  const [premiumPlan, setPremiumPlan] = useState(null);

  useEffect(() => {
    const getPlansAndUserMembership = async () => {
      setIsLoading(true);
      try {
        // 1. 모든 멤버십 플랜 데이터 불러오기
        const plansData = await fetchMembershipPlans();
        console.log("백엔드에서 불러온 멤버십 플랜:", plansData);
        setMembershipPlans(plansData);

        // 각 플랜에 해당하는 객체를 찾아서 상태에 저장 (백엔드 이름이 영어 'free', 'standard', 'premium'임을 가정)
        setFreePlan(plansData.find((p) => p.membership === "free"));
        setStandardPlan(plansData.find((p) => p.membership === "standard"));
        setPremiumPlan(plansData.find((p) => p.membership === "premium"));

        // 2. 현재 로그인된 사용자의 멤버십 정보 불러오기
        const userDetails = await getMyPage();
        console.log("로그인 사용자 정보 (UserDTO):", userDetails);

        // --- 이 부분을 수정합니다! ---
        // userDetails.membership 객체가 존재하고 그 안에 no 필드가 있는지 확인
        if (
          userDetails &&
          userDetails.membership &&
          typeof userDetails.membership.no !== "undefined"
        ) {
          setCurrentMembershipNo(userDetails.membership.no);
          console.log("현재 사용 중인 멤버십 No:", userDetails.membership.no);
        } else {
          // 사용자 정보가 없거나, 멤버십 정보가 없거나 (예: 무료 사용자), 멤버십 No가 정의되지 않은 경우
          // 기본값을 0 (무료 멤버십 ID로 가정) 또는 null로 설정.
          // DB에 무료 멤버십의 no가 0으로 저장되어 있다면 0으로 설정하는 것이 유용합니다.
          setCurrentMembershipNo(0);
          console.log(
            "현재 사용 중인 멤버십 정보를 찾을 수 없습니다. 기본값 0으로 설정."
          );
        }
        // --- 수정 끝 ---
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        alert("데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    };

    getPlansAndUserMembership();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // '시작하기' 버튼 클릭 핸들러
  const handleStartClick = (membershipNo) => {
    if (membershipNo) {
      // membershipNo가 유효한 값인지 확인
      navigate(`/membership/checkout?membershipNo=${membershipNo}`); // 쿼리 파라미터로 멤버십 번호 전달
    } else {
      alert("선택된 멤버십 정보를 찾을 수 없습니다. 다시 시도해주세요.");
      console.warn("Attempted to navigate with a null membershipNo.");
    }
  };

  // 로딩 중일 때 또는 데이터가 없을 때 표시할 UI
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>멤버십 플랜을 불러오는 중...</h1>
        <p>잠시만 기다려 주세요.</p>
      </div>
    );
  }

  // 로딩이 끝났는데도 멤버십 플랜이 하나도 없는 경우
  if (membershipPlans.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>표시할 멤버십 플랜이 없습니다.</h1>
        <p>
          데이터베이스에 멤버십 정보가 올바르게 저장되어 있는지 확인해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="pricing-wrapper">
      {/* 무료 플랜 카드 */}
      <div className="plan-card">
        <div className="plan-title">
          {freePlan ? "무료" : "무료"} {/* UI에는 한글로 표시 */}
        </div>
        <div className="price">
          ₩{freePlan ? freePlan.price.toLocaleString() : "0"}
        </div>
        <div className="price-sub">기본 기능만 사용</div>
        <ul className="features">
          <li>최대 3명 프로젝트 추가</li>
          <li>최대 5개 페이지 생성</li>
          <li>공유 멤버 최대 3명</li>
          <li>메시지 채널 최대 3명</li>
          <li>최대 3명까지 DM 발송 가능</li>
        </ul>
        <button
          className="start-btn"
          onClick={() => handleStartClick(freePlan ? freePlan.no : null)}
          disabled={
            !freePlan || (freePlan && freePlan.no === currentMembershipNo)
          } // 플랜이 없거나 현재 사용 중이면 비활성화
        >
          {freePlan && freePlan.no === currentMembershipNo
            ? "사용중"
            : "시작하기"}
        </button>
      </div>

      {/* 스탠다드 플랜 카드 */}
      <div className="plan-card">
        <div className="badge">Most Popular</div>
        <div className="plan-title">
          {standardPlan ? "스탠다드" : "스탠다드"}{" "}
        </div>
        <div className="price-original">₩65,000</div>
        <div className="price">
          ₩{standardPlan ? standardPlan.price.toLocaleString() : "35,000"}
        </div>
        <div className="price-sub">월 결제</div>
        <ul className="features">
          <li>최대 10명 프로젝트 추가</li>
          <li>최대 10개 페이지 생성</li>
          <li>공유 멤버 최대 10명</li>
          <li>메시지 채널 최대 10명</li>
          <li>최대 10명까지 DM 발송</li>
          <li>최대 10개 게시판 이용</li>
          <li>최대 10개 프로젝트</li>
          <li>드라이브 1GB</li>
        </ul>
        <button
          className="start-btn"
          onClick={() =>
            handleStartClick(standardPlan ? standardPlan.no : null)
          }
          disabled={
            !standardPlan ||
            (standardPlan && standardPlan.no === currentMembershipNo)
          }
        >
          {standardPlan && standardPlan.no === currentMembershipNo
            ? "사용중"
            : "시작하기"}
        </button>
      </div>

      {/* 프리미엄 플랜 카드 */}
      <div className="plan-card">
        <div className="plan-title">
          {premiumPlan ? "프리미엄" : "프리미엄"}{" "}
        </div>
        <div className="price-original">₩125,000</div>
        <div className="price">
          ₩{premiumPlan ? premiumPlan.price.toLocaleString() : "95,000"}
        </div>
        <div className="price-sub">월 결제</div>
        <ul className="features">
          <li>무제한 프로젝트 추가</li>
          <li>무제한 페이지 생성</li>
          <li>무제한 공유 멤버</li>
          <li>무제한 메시지 채널</li>
          <li>무제한 DM 발송</li>
          <li>무제한 게시판 이용</li>
          <li>무제한 프로젝트</li>
          <li>드라이브 무제한</li>
        </ul>
        <button
          className="start-btn"
          onClick={() => handleStartClick(premiumPlan ? premiumPlan.no : null)}
          disabled={
            !premiumPlan ||
            (premiumPlan && premiumPlan.no === currentMembershipNo)
          }
        >
          {premiumPlan && premiumPlan.no === currentMembershipNo
            ? "사용중"
            : "시작하기"}
        </button>
      </div>
    </div>
  );
};
