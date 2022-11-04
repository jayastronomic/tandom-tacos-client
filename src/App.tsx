import { FC, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStatus } from "./network/User";
import { fetchUserSuccess } from "./features/user/userSlice";
import SignUp from "./pages/SignUpPage/SignUp";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Explore from "./pages/ExplorePage/Explore";
import Recipe from "./pages/RecipePage/Recipe";
import Profile from "./pages/ProfilePage/Profile";
import AppWrapper from "./components/AppWrapper";
import { User } from "./interfaces/user.interface";

const App: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const authUser: User = await loginStatus().catch(console.error);
      if (!authUser.logged_in) {
        navigate("/login", {
          state: { from: location.pathname, redirected: true },
        });
      } else {
        dispatch(fetchUserSuccess(authUser));
      }
    };
    fetchUser();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<AppWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:uuid" element={<Recipe />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
      </Route>
    </Routes>
  );
};

export default App;
