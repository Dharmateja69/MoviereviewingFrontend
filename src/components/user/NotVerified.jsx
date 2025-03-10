import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks";
import Container from "../Container";

const NotVerified = () => {
  const { authInfo } = useAuth();
  // console.log(authInfo);
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo?.profile?.isVerified ?? false;
  // console.log("User Logged In:", isLoggedIn);
  // console.log("User Verified:", isVerified);

  const navigate = useNavigate();
  const navigateToVerification = () => {
    navigate("/auth/verification", { state: { user: authInfo.profile } });
  };

  return (
    <Container>
      Home
      {!isVerified && isLoggedIn ? (
        <p className="text-lg text-center bg-black-50 p-2">
          It looks like you haven't verified your account,
          <button
            onClick={navigateToVerification}
            className="text-blue-500 font-semibold hover:underline"
          >
            click here to verify your account
          </button>
        </p>
      ) : null}
    </Container>
  );
};

export default NotVerified;
