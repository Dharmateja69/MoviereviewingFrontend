//14-12-24
import React, { useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CoustomLinks from "../CoustomLinks";
import FormContainer from "../form/FormContainer";
import Forminput from "../form/Forminput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange=({target})=>{
    const {value,name}=target;
    setUserInfo({...userInfo,[name]:value})
  }

  
  const handlesubmit=(e)=>{
   e.preventDefault();
   console.log(userInfo);
  };
  const { name, email, password } = userInfo;

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handlesubmit} className={commonModalClasses + " w-72"}>
          <Title>Signup</Title>
          <Forminput
          onChange={handleChange}
            value={name}
            label="Name"
            placeholder="jhone"
            name="name"
          />
          <Forminput
          onChange={handleChange}
            value={email}
            label="Email"
            placeholder="jhone@gmail.com"
            name="email"
          />
          <Forminput
          onChange={handleChange}
            value={password}
            label="Password"
            placeholder="********"
            name="password"
          />
          <Submit value="Signup" />
          <div className="flex justify-between">
            <CoustomLinks to="/auth/forget-password">
              Forget password
            </CoustomLinks>
            <CoustomLinks to="/auth/Signin">Signin</CoustomLinks>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
