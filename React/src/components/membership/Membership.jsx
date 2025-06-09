import React from "react";

export const Membership = () => {
  return (
    <div class="pricing-wrapper">
      <div class="plan-card">
        <div class="plan-title">무료</div>
        <div class="price">₩0</div>
        <div class="price-sub">기본 기능만 사용</div>
        <ul class="features">
          <li>최대 3명 프로젝트 추가</li>
          <li>최대 5개 페이지 생성</li>
          <li>공유 멤버 최대 3명</li>
          <li>메시지 채널 최대 3명</li>
          <li>최대 3명까지 DM 발송 가능</li>
        </ul>
        <button
          class="start-btn"
          onClick={() => {
            window.location.href = "/membership/checkout";
          }}
        >
          시작하기
        </button>
      </div>

      <div class="plan-card">
        <div class="badge">Most Popular</div>
        <div class="plan-title">스탠다드</div>
        <div class="price-original">₩65,000</div>
        <div class="price">₩35,000</div>
        <div class="price-sub">월 결제</div>
        <ul class="features">
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
          class="start-btn"
          onClick={() => {
            window.location.href = "/membership/checkout";
          }}
        >
          시작하기
        </button>
      </div>

      <div class="plan-card">
        <div class="plan-title">프리미엄</div>
        <div class="price-original">₩125,000</div>
        <div class="price">₩95,000</div>
        <div class="price-sub">월 결제</div>
        <ul class="features">
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
          class="start-btn"
          onClick={() => {
            window.location.href = "/membership/checkout";
          }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};
