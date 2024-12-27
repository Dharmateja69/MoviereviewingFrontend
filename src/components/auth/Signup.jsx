import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { createUser } from "../../api/auth";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLinks from "../CoustomLinks";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const validateUserInfo = ({ name, email, password }) => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidName = /^[a-zA-Z\s]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail.test(email))
    return { ok: false, error: "Invalid email format!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be at least 8 characters long!" };

  return { ok: true };
};

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return console.log(error);
    const response = await createUser(userInfo);
    if (response.error) return console.log(error);

    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,
    });

    console.log(response.user);
  };

  const { name, email, password } = userInfo;

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Signup</Title>
          <FormInput
            onChange={handleChange}
            value={name}
            label="Name"
            placeholder="John"
            name="name"
          />
          <FormInput
            onChange={handleChange}
            value={email}
            label="Email"
            placeholder="john@gmail.com"
            name="email"
          />
          <FormInput
            onChange={handleChange}
            value={password}
            label="Password"
            placeholder="********"
            name="password"
          />
          <Submit value="Signup" />
          <div className="flex justify-between">
            <CustomLinks to="/auth/forget-password">
              Forgot password
            </CustomLinks>
            <CustomLinks to="/auth/signin">Signin</CustomLinks>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
