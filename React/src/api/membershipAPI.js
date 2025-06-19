import axios from "axios";
import { MEMBERSHIP_CHECKOUT, MEMBERSHIP_PLANS } from "./_http";

export const fetchMembershipPlans = async () => {
  try {
    const response = await axios.get(MEMBERSHIP_PLANS); // 정의된 상수를 사용
    return response.data; // List<MembershipDTO>
  } catch (error) {
    console.error("Error fetching membership plans:", error);
    throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있도록 함
  }
};

export const fetchMembershipByNo = async (membershipNo) => {
  // 'no'를 'membershipNo'로 변경해도 되고 안 해도 됩니다. 함수 인자 이름은 내부에서만 사용.
  try {
    // --- 이 부분을 수정합니다! ---
    // 쿼리 파라미터 이름을 백엔드 @RequestParam("membershipNo")와 일치시킵니다.
    const response = await axios.get(
      `${MEMBERSHIP_CHECKOUT}?membershipNo=${membershipNo}`
    );
    console.log(
      `Sending request for membership details to: ${MEMBERSHIP_CHECKOUT}?membershipNo=${membershipNo}`
    ); // 디버깅용 로그
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching membership with ID ${membershipNo} for checkout:`,
      error
    );
    throw error;
  }
};

export const processCheckout = async (checkoutData) => {
  try {
    console.log("결제 요청 데이터를 보냅니다:", checkoutData); // 디버깅용 로그
    // 백엔드 @PostMapping("/membership/checkout") 경로에 맞춰 POST 요청
    const response = await axios.post(MEMBERSHIP_CHECKOUT, checkoutData, {
      withCredentials: true, // 세션 쿠키 등 인증 정보를 자동으로 포함하여 전송
    });
    return response.data; // 백엔드에서 반환하는 CheckoutDTO (또는 다른 응답 형태)
  } catch (error) {
    console.error(
      "결제 처리 중 오류 발생 (POST):",
      error.response?.data || error.message
    );
    throw error; // 오류를 다시 던져서 호출하는 쪽으로 전달
  }
};
