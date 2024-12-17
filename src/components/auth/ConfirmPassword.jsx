import React from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Forminput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function ConfirmPassword() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"}>
          <Title>Enter new Pasword</Title>
          <Forminput label="New Password" placeholder="*******" name="password" type="password" />
          <Forminput label="Confirm Password" placeholder="*******" name="ConfirmPassword" type="password"/>

          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}
