import { FC } from "react";
import Logo from "../SignUpPage/Logo";
import LoginForm from "./LoginForm";

const Login: FC = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col justify-center items-center h-screen space-y-8 md:flex-row md:space-x-28 overflow-auto">
      <Logo />
      <LoginForm />
    </div>
  );
};

export default Login;
