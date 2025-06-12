import axios from "axios";
import { MYPAGE_MYPAGE } from "./_http";

export const getMyPage = async () => {
  try {
    const response = await axios.get(`${MYPAGE_MYPAGE}`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 마이페이지 정보 수정
export const updateMyPage = async (userData) => {
  try {
    const response = await axios.put(MYPAGE_MYPAGE, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(
      "API Error updating myPage:",
      err.response ? err.response.data : err.message
    );
    throw err; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있도록 함
  }
};
