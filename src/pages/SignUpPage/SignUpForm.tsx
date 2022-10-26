import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserIfNotExist } from "../../network/User";
import { useDispatch } from "react-redux";
import { fetchUserSuccess } from "../../features/user/userSlice";
import { User } from "../../interfaces/user.interface";

const SignUpForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "username") setUsername(e.target.value);
    if (e.target.name === "name") setName(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "passwordConfirmation")
      setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: object = {
      user: {
        email: email,
        username: username,
        name: name,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    };
    const user = await createUserIfNotExist(newUser).catch((err) =>
      console.log(err)
    );
    dispatch(fetchUserSuccess(user));
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6 border px-12 py-10 rounded-xl shadow"
    >
      <p className="text-gray-700 font-semibold text-xl">Sign Up</p>
      <input
        className="border text-sm px-2 py-1 rounded focus:outline-none focus:ring-4 focus:border-blue-300 ring-blue-100 text-gray-700"
        placeholder="Email"
        name="email"
        type="email"
        value={email}
        onChange={handleChange}
      />

      <input
        className="border text-sm px-2 py-1 rounded focus:outline-none focus:ring-4 focus:border-blue-300 ring-blue-100 text-gray-700"
        placeholder="Username"
        name="username"
        type="text"
        value={username}
        onChange={handleChange}
      />

      <input
        className="border text-sm px-2 py-1 rounded focus:outline-none focus:ring-4 focus:border-blue-300 ring-blue-100 text-gray-700"
        placeholder="Name"
        name="name"
        type="text"
        value={name}
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

      <input
        autoComplete=""
        className="border text-sm px-2 py-1 rounded focus:outline-none focus:ring-4 focus:border-blue-300 ring-blue-100 text-gray-700"
        placeholder="Confirm Password"
        name="passwordConfirmation"
        type="password"
        value={passwordConfirmation}
        onChange={handleChange}
      />

      <button
        className="text-xs bg-blue-400 text-white semi-bold rounded-sm py-1"
        type="submit"
      >
        Create Account
      </button>

      <div className="text-xs">
        Already have an account?{" "}
        <Link className="text-blue-400 hover:underline" to="/login">
          Log in
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
