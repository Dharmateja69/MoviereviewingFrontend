import React from "react";
import Container from "../Container";
import Forminput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function ConfirmPassword() {
  return (
    <div className="fixed bg-primary inset-0 -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
          <Title>Enter new Pasword</Title>
          <Forminput label="New Password" placeholder="*******" name="password" type="password" />
          <Forminput label="Confirm Password" placeholder="*******" name="ConfirmPassword" type="password"/>

          <Submit value="Confirm Password" />
        </form>
      </Container>
    </div>
  );
}
