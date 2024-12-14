
//14-12-24
import React from "react";
import Container from "../Container";
import CoustomLinks from "../CoustomLinks";
import Forminput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function Signup() {
  return (
    <div className="fixed bg-primary inset-0 -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title>Signup</Title>
          <Forminput label="Name" placeholder="jhone" name="name" />
          <Forminput label="Email" placeholder="jhone@gmail.com" name="email" />
          <Forminput label="Password" placeholder="********" name="password" />
          <Submit value="Signup" />
          <div className="flex justify-between">
          <CoustomLinks  to="/auth/forget-password" >
                      Forget password
                    </CoustomLinks>
                    <CoustomLinks  to="/auth/Signin" >
                    Signin
                    </CoustomLinks>
                
          </div>
        </form>
      </Container>
    </div>
  );
}