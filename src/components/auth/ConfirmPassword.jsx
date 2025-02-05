import React, { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPasswordResetoken } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Forminput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function ConfirmPassword() {
  const [isverifying, setverifying] = useState(true);
  const [isValid, setisValid] = useState(false);
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const { updateNotifcation } = useNotification();
  const token = searchparams.get("token");
  const id = searchparams.get("id");
  // console.log(token, id);

  useEffect(() => {
    isValidToken();
  }, []);
  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetoken(token, id);
    setverifying(false);

    if (error) return updateNotifcation("error", error);

    if (valid) {
      setisValid(false);

      return navigate("/auth/rest-password", { replace: true });
    }

    setisValid(true);
  };
  if (isverifying) {
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait we are verifying Your token.
            </h1>
            <ImSpinner className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );
  }
  if (!isValid) {
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Sorry the token is invalid!
            </h1>
          </div>
        </Container>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"}>
          <Title>Enter new Pasword</Title>
          <Forminput
            label="New Password"
            placeholder="*******"
            name="password"
            type="password"
          />
          <Forminput
            label="Confirm Password"
            placeholder="*******"
            name="ConfirmPassword"
            type="password"
          />

          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}
