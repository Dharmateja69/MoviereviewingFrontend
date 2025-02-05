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
    const { data } = await client.post("/user/signin", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const getIsAuth = async (token) => {
  try {
    const { data } = await client.get("/user/is-auth", {
      headers: {
        Authorization: 'Bearer ' + token,
        accept: "application/json",
      }
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};


export const forgetPassword = async (email) => {
  try {
    const { data } = await client.post("/user/forget-password", { email });
    return data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;  // ✅ Return server error message if available
    }
    return { error: error.message || "Something went wrong!" }; // ✅ Improved fallback message
  }
};
export const verifyPasswordResetoken = async (token, userId) => {
  try {
    const { data } = await client.post("/user/verify-pass-reset-token", { token, userId });
    return data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;  // ✅ Return server error message if available
    }
    return { error: error.message || "Something went wrong!" }; // ✅ Improved fallback message
  }
};
