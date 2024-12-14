import React from "react";
import Container from "../Container";
import CoustomLinks from "../CoustomLinks";
import Forminput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";
// 14-12-24
export default function ForgetPassword() {
  return (
    <div className="fixed bg-primary inset-0 -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
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
    </div>
  );
}
