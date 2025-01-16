import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { verifyUserEmail } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OTP_length = 6;

const isValidOtp = (otp) => {
  if (!otp || !Array.isArray(otp)) return false; // Ensure otp is an array
  for (let val of otp) {
    if (isNaN(parseInt(val))) {
      return false;
    }
  }
  return true;
};

export default function Emailverification() {
  const [otp, setOtp] = useState(new Array(OTP_length).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const { state } = useLocation();
  const user = state?.user;

  // Correctly initialize the notification function using the hook
  const { updateNotifcation } = useNotification();

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    setActiveOtpIndex(index > 0 ? index - 1 : 0);
  };

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];

    if (/^\d*$/.test(value)) {
      newOtp[index] = value.substring(value.length - 1, value.length);
      setOtp(newOtp);

      if (value) focusNextInputField(index);
    }
  };

  const handleKeyDown = ({ key }, index) => {
    if (key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else {
        focusPrevInputField(index);
      }
    }

    if (key === "ArrowRight") focusNextInputField(index);
    if (key === "ArrowLeft") focusPrevInputField(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidOtp(otp)) {
      return updateNotifcation("error", "Invalid OTP"); // Notify about invalid OTP
    }
    //submit otp
    const { error, message } = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
    });

    if (error) return updateNotifcation("error", error);
    updateNotifcation("success", message);
  };

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses}>
          <div>
            <Title>Please Enter the OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => (
              <input
                ref={activeOtpIndex === index ? inputRef : null}
                type="text"
                value={otp[index] || ""}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                key={index}
                maxLength={1}
                className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary bg-transparent rounded outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
              />
            ))}
          </div>
          <div>
            <Submit value="Verify Account" />
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
