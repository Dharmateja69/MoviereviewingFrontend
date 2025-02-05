import React, { useState } from "react";
import { forgetPassword } from "../../api/auth";
import { useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/Helper";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CoustomLinks from "../CoustomLinks";
import FormContainer from "../form/FormContainer";
import Forminput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";
// 14-12-24
export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { updateNotifcation } = useNotification(); // ✅ Fixed typo

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email))
      return updateNotifcation("error", "Invalid email!");

    const { error, message } = await forgetPassword(email); // ✅ Ensure API returns correct structure

    if (error) return updateNotifcation("error", error); // ✅ Return actual error message
    updateNotifcation("success", message);
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
          <Title>Pleae Enter Your Email</Title>
          <Forminput
            onChange={handleChange}
            value={email}
            label="Email"
            placeholder="jhone@gmail.com"
            name="email"
          />

          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CoustomLinks to="/auth/Signin">Signin</CoustomLinks>
            <CoustomLinks to="/auth/Signup">Signup</CoustomLinks>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
