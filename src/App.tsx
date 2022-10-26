import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStatus } from "./network/User";
import { fetchUserSuccess } from "./features/user/userSlice";
import SignUp from "./pages/SignUpPage/SignUp";
import Home from "./pages/HomePage/Home";
import { useAppSelector } from "./app/hooks";

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
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
