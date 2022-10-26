import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../network/User";
import { fetchUserSuccess } from "../../features/user/userSlice";

const LoginForm: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: object = {
      user: {
        email: email,
        password: password,
      },
    };
    const authenticatedUser = await login(user).catch(console.error);
    dispatch(fetchUserSuccess(authenticatedUser));
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6 border px-12 py-10 rounded-xl shadow"
    >
      <p className="text-gray-700 font-semibold text-xl">Log in</p>
      <input
        className="border text-sm px-2 py-1 rounded focus:outline-none focus:ring-4 focus:border-blue-300 ring-blue-100 text-gray-700"
        placeholder="Email"
        name="email"
        type="email"
        value={email}
        onChange={handleChange}
      />

      <input
        autoComplete=""
        className="border text-sm px-2 py-1 rounded focus:outline-none focus:ring-4 focus:border-blue-300 ring-blue-100 text-gray-700"
        placeholder="Password"
        name="password"
        type="password"
        value={password}
        onChange={handleChange}
      />

      <button
        className="text-xs bg-blue-400 text-white semi-bold rounded-sm py-1"
        type="submit"
      >
        Log in
      </button>

      <div className="text-xs">
        Don't have an account?{" "}
        <Link className="text-blue-400 hover:underline" to="/signup">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
