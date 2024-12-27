import React, { useEffect, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OTP_length = 6;

export default function Emailverification() {
  const [otp, setotp] = useState(new Array(OTP_length).fill(""));

  const [activeOtpIndex, setActiveOtpindex] = useState(0);


  const {state} = useLocation();
 const user = state?.user

 const navigate = useNavigate();

  const focusNextInputField = (index) => {
    setActiveOtpindex(index + 1);
  };

  const focusPrevtInputField = (index) => {
    setActiveOtpindex(index > 0 ? index - 1 : 0);
  };

  const handleotpchange = ({ target }, index) => {
    const { value } = target;
    const newotp = [...otp];

    // Allow only numeric input and one character per input field
    if (/^\d*$/.test(value)) {
      newotp[index] = value.substring(value.length - 1, value.length);
      setotp(newotp);

      // Move focus only if a value is entered
      if (value) focusNextInputField(index);
    }
  };

  const handleKeyDown = ({ key }, index) => {
    if (key === "Backspace") {
      const newotp = [...otp];
      if (otp[index]) {
        // Clear the current input box first
        newotp[index] = "";
        setotp(newotp);
      } else {
        // If the current input is already empty, move focus to the previous input
        focusPrevtInputField(index);
      }
    }

    if (key === "ArrowRight") {
      focusNextInputField(index);
    }

    if (key === "ArrowLeft") {
      focusPrevtInputField(index);
    }
  };

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);


  useEffect(()=>
  {
    if(!user)navigate("*");
  })
  // if(!user) return null;

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses}>
          <div>
            <Title>Please Enter the OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  type="text" // Use "text" to avoid spin buttons
                  value={otp[index] || ""}
                  onChange={(e) => handleotpchange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  key={index}
                  maxLength={1}
                  className="w-12 h-12 border-2 dark:border-dark-subtle  border-light-subtle dark:focus:border-white focus:border-primary bg-transparent rounded outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
                />
              );
            })}
          </div>
          <div>
            <Submit value="Send Link" />
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
