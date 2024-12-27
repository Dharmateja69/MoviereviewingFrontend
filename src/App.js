import { Route, Routes } from "react-router";
import "./App.css";
import ConfirmPassword from "./components/auth/ConfirmPassword";

import Emailverification from "./components/auth/Emailverification";
import ForgetPassword from "./components/auth/ForgetPassword";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Singin";
import Home from "./components/Home";
import Notfound from "./components/Notfound";
import Navba from "./components/user/NavBar";
function App() {
  return (
    <>
      {/* 14-12-24 */}
      <Navba />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/Signin" element={<Signin />} />
        <Route path="/auth/Signup" element={<Signup />} />
        <Route path="/auth/verification" element={<Emailverification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />

        <Route path="/auth/confirm-password" element={<ConfirmPassword />} />
        <Route path="*" element={<Notfound />} />


      </Routes>
      {/* <Signup /> */}
    </>
  );
}

export default App;