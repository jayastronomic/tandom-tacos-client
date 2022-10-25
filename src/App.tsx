import { Sign } from "crypto";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import SignUp from "./pages/SignUpPage/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
