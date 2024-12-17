import React from "react";

import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CoustomLinks from "../CoustomLinks";
import FormContainer from "../form/FormContainer";
import Forminput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function Singin() {


  return (
    <FormContainer >
      <Container>
        <form className={ commonModalClasses + " w-72"}  >
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
    </FormContainer>
  );
}