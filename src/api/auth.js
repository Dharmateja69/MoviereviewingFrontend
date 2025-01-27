import client from "./clients";

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/create", userInfo);

    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyUserEmail = async (userInfo) => {
  try {
    console.log("Sending OTP verification request:", userInfo);

    const { data } = await client.post("/user/verify-email", userInfo);
    return data;
  } catch (error) {
    console.error("OTP verification failed:", error.response?.data); // Debugging

    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const signInUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/sign-in", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
