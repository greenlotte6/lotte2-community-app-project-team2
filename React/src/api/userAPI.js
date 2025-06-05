import axios from "axios";
import { USER_REGISTER, USER_TERMS } from "./_http";

export const getTerms = async () => {
  try {
    const response = await axios.get(`${USER_TERMS}`);
    console.log(response.data);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postUser = async (data) => {
  try {
    const response = await axios.post(`${USER_REGISTER}`, data);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
