import React from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CoustomLinks from "../CoustomLinks";
import FormContainer from "../form/FormContainer";
import Forminput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";
// 14-12-24
export default function ForgetPassword() {
  return (
    <FormContainer >
      <Container>
        <form className={commonModalClasses + " w-96"}>
          <Title>Pleae Enter Your Email</Title>
          <Forminput label="Email" placeholder="jhone@gmail.com" name="email" />

          <Submit value="Send Link" />
          <div className="flex justify-between">
         
            <CoustomLinks to="/auth/Signin">Signin</CoustomLinks>
            <CoustomLinks to="/auth/Signup">
             Signup
            </CoustomLinks>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
