import React, { useState } from "react";

import { useAuth, useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CoustomLinks from "../CoustomLinks";
import FormContainer from "../form/FormContainer";
import Forminput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function Singin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { updateNotifcation } = useNotification();

  const { handleLogin, authInfo } = useAuth();
  console.log(authInfo);
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotifcation("error", error);
    handleLogin(userInfo.email, userInfo.password);
  };

  const validateUserInfo = ({ email, password }) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail.test(email))
      return { ok: false, error: "Invalid email format!" };

    if (!password.trim()) return { ok: false, error: "Password is missing!" };
    if (password.length < 8)
      return {
        ok: false,
        error: "Password must be at least 8 characters long!",
      };

    return { ok: true };
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sing-in</Title>
          <Forminput
            label="Email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="jhone@gmail.com"
            name="email"
            type="email"
          />
          <Forminput
            label="Password"
            onChange={handleChange}
            value={userInfo.password}
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit value="Sign in" />
          <div className="flex justify-between">
            <CoustomLinks to="/auth/forget-password">
              Forget password
            </CoustomLinks>
            <CoustomLinks to="/auth/Signup">Sign up</CoustomLinks>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
