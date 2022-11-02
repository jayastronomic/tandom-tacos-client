import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStatus } from "./network/User";
import { fetchUserSuccess } from "./features/user/userSlice";
import { useAppSelector } from "./app/hooks";
import SignUp from "./pages/SignUpPage/SignUp";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Explore from "./pages/ExplorePage/Explore";
import Recipe from "./pages/RecipePage/Recipe";

import AppWrapper from "./components/AppWrapper";

const App: FC = (): JSX.Element => {
  const authUser = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(fetchUserSuccess(await loginStatus()));
    };
    fetchUser().catch(console.error);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<AppWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:uuid" element={<Recipe />} />
        <Route path="/explore" element={<Explore />} />
      </Route>
    </Routes>
  );
};

export default App;
