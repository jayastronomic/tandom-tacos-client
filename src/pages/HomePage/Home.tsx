import { FC } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { logout as logOff } from "../../network/User";

const Home: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          const response: any = await logOff();
          dispatch(logout(response));
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Home;
