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
