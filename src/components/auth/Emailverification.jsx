import React, { useEffect, useRef, useState } from "react";
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";
// 14-12-24
const OTP_length = 6;



export default function Emailverification() {
  const [otp, setotp] = useState(new Array(OTP_length).fill(""));
 

  const [activeOtpIndex,setActiveOtpindex]=useState(0);
  


  const handleotpchange=({target},index)=>{
    const {value}=target;
    // setotp([value]);
    setActiveOtpindex(index+1);
  
  }

  const  inputRef = useRef();

useEffect(()=>{
inputRef.current?.focus()
  
},[activeOtpIndex])


  return (
    <div className="fixed bg-primary inset-0 -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 space-y-6">
          <div className="div">
            <Title>Pleae Enter the OTP to verify your account</Title>
            <p className="text-center text-dark-subtle">
              OTP has been sent to your email
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                ref={activeOtpIndex === index ?inputRef:null}
                type="number"
                value={otp[index] || ''}
                onChange={(e)=>handleotpchange(e,index)}
                  key={index}
                  className="w-12 h-12 border-2 border-dark-subtle focus:border-white bg-transparent rounded outline-none text-center text-white font-semibold text-xl spin-button-none" 
                />
              );
            })}
          </div>
          <div >
            <Submit value="Send Link" />
          </div>
        </form>
      </Container>
    </div>
  );
}
