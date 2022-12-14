import React, { FC } from "react";
import Logo from "./Logo";
import SignUpForm from "./SignUpForm";

const SignUp: FC = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col justify-center items-center h-screen space-y-8 md:flex-row md:space-x-28 p-8 overflow-auto">
      <Logo />
      <SignUpForm />
    </div>
  );
};

export default SignUp;
