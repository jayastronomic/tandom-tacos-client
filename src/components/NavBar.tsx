import { Dispatch } from "react";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../network/User";
import { logoutSuccess } from "../features/user/userSlice";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import plusButton from "../images/tandem_plus_button.png";
import homeLogo from "../images/home_logo.png";

type NavBarProps = {
  setShow: Dispatch<boolean>;
};

const NavBar = ({ setShow }: NavBarProps): JSX.Element => {
  const authUser = useAppSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutSuccess(await logout().catch(console.error)));
    navigate("/login");
  };

  const linkClass =
    "flex flex-col items-center justify-center border-gray-300 w-full h-32 transition linear" +
    " hover:bg-orange-300 rounded-sm hover:shadow-md hover:translate-x-0.5 hover:w-42" +
    " hover:text-white";
  const iconClass = "";
  return (
    <nav className="w-20">
      <div className="flex flex-col items-center text-2xl text-gray-700">
        <Link className="pt-10" to="/">
          <img className="w-20 transition-all" src={homeLogo} />
        </Link>
        <Link className={linkClass} to="/">
          <FontAwesomeIcon className={iconClass} icon={solid("house")} />{" "}
          <p className="text-xs">Home</p>
        </Link>
        <Link className={linkClass} to="/explore">
          <FontAwesomeIcon className={iconClass} icon={solid("search")} />
          <p className="text-xs">Explore</p>
        </Link>
        <Link className={linkClass} to="/">
          <FontAwesomeIcon className={iconClass} icon={solid("bookmark")} />
          <p className="text-xs">Saved</p>
        </Link>
        <Link className={linkClass} to={`/${authUser.username}`}>
          <FontAwesomeIcon className={iconClass} icon={solid("user")} />
          <p className="text-xs">Profile</p>
        </Link>
        <img
          onClick={() => setShow(true)}
          className={
            authUser.recipes.length === 0 &&
            location.pathname === `/${authUser.username}`
              ? "w-10 hover:rotate-12 hover:scale-125 transition-all pt-4 animate-bounce cursor-pointer hover:animate-none"
              : "w-10 hover:rotate-12 hover:scale-125 transition-all pt-4 cursor-pointer"
          }
          src={plusButton}
        />
        <button
          className="text-sm rounded bg-orange-300 text-white px-2 mt-8 hover:bg-orange-400"
          type="button"
          onClick={() => handleLogout()}
        >
          Log off
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
