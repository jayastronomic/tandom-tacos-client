import React from "react";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <form className="flex flex-col space-y-6 border px-12 py-10 rounded-xl shadow">
      <p className="text-gray-700 font-semibold text-xl">Sign Up</p>

      <input
        className="border text-sm px-2 py-1 rounded focus:outline-none focus:ring-4 focus:border-blue-300 ring-blue-100 text-gray-700"
        placeholder="Email"
        name="email"
        type="email"
      />

      <input
        className="border text-sm px-2 py-1 rounded focus:outline-none focus:ring-4 focus:border-blue-300 ring-blue-100 text-gray-700"
        placeholder="Username"
        name="username"
        type="text"
      />

      <input
        className="border text-sm px-2 py-1 rounded focus:outline-none focus:ring-4 focus:border-blue-300 ring-blue-100 text-gray-700"
        placeholder="Name"
        name="name"
        type="text"
      />

      <input
        className="border text-sm px-2 py-1 rounded focus:outline-none focus:ring-4 focus:border-blue-300 ring-blue-100 text-gray-700"
        placeholder="Password"
        name="password"
        type="password"
      />

      <input
        className="border text-sm px-2 py-1 rounded focus:outline-none focus:ring-4 focus:border-blue-300 ring-blue-100 text-gray-700"
        placeholder="Confirm Password"
        name="passwordConfirmation"
        type="password"
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
