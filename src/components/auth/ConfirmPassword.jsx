import React, { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetpassword, verifyPasswordResetoken } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Forminput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function ConfirmPassword() {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isVerifying, setVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateNotifcation } = useNotification();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  useEffect(() => {
    const validateToken = async () => {
      const { error, valid } = await verifyPasswordResetoken(token, id);
      setVerifying(false);

      if (error) {
        updateNotifcation("error", error);
        return navigate("/auth/reset-password", { replace: true });
      }

      if (valid) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };

    if (token && id) {
      validateToken();
    } else {
      setVerifying(false);
      setIsValid(false);
    }
  }, [token, id, navigate, updateNotifcation]);

  if (isVerifying) {
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait, we are verifying your token.
            </h1>
            <ImSpinner className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.one.trim()) {
      return updateNotifcation("error", "Password is missing!");
    }
    if (password.one.trim().length < 8) {
      return updateNotifcation(
        "error",
        "Password must be at least 8 characters!"
      );
    }
    if (password.one !== password.two) {
      return updateNotifcation("error", "Passwords do not match!");
    }

    const { error, message } = await resetpassword({
      newPassword: password.one,
      userId: id,
      token,
    });

    if (error) return updateNotifcation("error", error);
    updateNotifcation("success", message);
    // console.log({ newPassword });
    navigate("/auth/signin", { replace: true });
  };

  if (!isValid) {
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Sorry, the token is invalid!
            </h1>
          </div>
        </Container>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
          <Title>Enter New Password</Title>
          <Forminput
            value={password.one}
            onChange={handleChange}
            label="New Password"
            placeholder="*******"
            name="one"
            type="password"
          />
          <Forminput
            value={password.two}
            onChange={handleChange}
            label="Confirm Password"
            placeholder="*******"
            name="two"
            type="password"
          />
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}
