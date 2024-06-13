import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKENDURL;

export const userSignUp = async (userDetails) => {
  try {
    const response = await axios.post(`${backendUrl}signUpUser`, userDetails);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (userDetails) => {
  try {
    const response = await axios.post(`${backendUrl}userlogIn`, userDetails);
    if (response?.data?.data) {
      localStorage.setItem("token", JSON.stringify(response.data.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const isUserValid = async (userId, token) => {
  try {
    const response = await axios.post(`${backendUrl}isUserValid`, {
      userId,
      token,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

