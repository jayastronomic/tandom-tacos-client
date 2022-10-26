import React, { FC } from "react";
import Logo from "./Logo";
import SignUpForm from "./SignUpForm";

const SignUp: FC = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center h-screen space-y-8 md:flex-row md:space-x-28">
      <Logo />
      <SignUpForm />
    </div>
  );
};

export default SignUp;
