import React from "react";

export const Checkout = () => {
  return (
    <section className="checkout-container">
      <h2 className="section-title">주문자 정보</h2>
      <div className="checkout-wrapper">
        <div className="checkout-form">
          <label>
            이름 <input type="text" placeholder="이름 입력" />
          </label>
          <label>
            이메일 <input type="email" placeholder="이메일 입력" />
          </label>
          <label>
            연락처 <input type="tel" placeholder="연락처 입력" />
          </label>

          <label>
            결제정보
            <select>
              <option disabled selected>
                카드 선택
              </option>
              <option>신한카드</option>
              <option>국민카드</option>
              <option>삼성카드</option>
            </select>
          </label>

          <div className="card-info">
            <label>카드번호 입력</label>
            <div className="card-number">
              <input type="text" maxlength="4" />
              <input type="text" maxlength="4" />
              <input type="text" maxlength="4" />
              <input type="text" maxlength="4" />
            </div>
          </div>

          <div className="expiry-info">
            <label>유효 기간</label>
            <div className="expiry-date">
              <input type="text" maxlength="2" placeholder="MM" />
              <span>/</span>
              <input type="text" maxlength="2" placeholder="YY" />
            </div>
          </div>
        </div>

        <div className="checkout-summary">
          <h3>상품 정보</h3>
          <p className="cost-label">예상 청구 비용</p>
          <p className="cost-value">₩95,000</p>
          <button className="pay-btn">결제 하기</button>
        </div>
      </div>
    </section>
  );
};
