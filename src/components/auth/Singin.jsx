import React from "react";

import Container from "../Container";
import CoustomLinks from "../CoustomLinks";
import Forminput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function Singin() {


  return (
    <div className="fixed  inset-0   dark:bg-primary bg-white  -z-10 flex justify-center items-center">
      <Container>
        <form className="dark:bg-secondary bg-white  drop-shadow-lg rounded p-6 w-72 space-y-6">
          <Title>Sing-in</Title>
          <Forminput label="Email" placeholder="jhone@gmail.com" name="email" />
          <Forminput label="Password" placeholder="********" name="password" />
          <Submit value="Sign in" />
          <div className="flex justify-between">
            <CoustomLinks  to="/auth/forget-password" >
              Forget password
            </CoustomLinks>
            <CoustomLinks  to="/auth/Signup" >
            Sign up
            </CoustomLinks>
        
          </div>
        </form>
      </Container>
    </div>
  );
}