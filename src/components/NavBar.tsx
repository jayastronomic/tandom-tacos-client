import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import plusButton from "../images/tandem_plus_button.png";
import homeLogo from "../images/home_logo.png";

const NavBar: FC = (): JSX.Element => {
  const linkClass =
    "flex items-center justify-center border-gray-300 w-full h-32 transition linear" +
    " hover:bg-gray-200 rounded-sm hover:shadow-md hover:translate-x-0.5" +
    "";
  const iconClass = "";
  return (
    <nav className="flex-auto w-20">
      <div className="flex flex-col items-center text-2xl text-gray-700 ">
        <Link className="pt-10" to="/">
          <img className="w-full transition-all" src={homeLogo} />
        </Link>
        <Link className={linkClass} to="/">
          <FontAwesomeIcon className={iconClass} icon={solid("house")} />
        </Link>
        <Link className={linkClass} to="/">
          <FontAwesomeIcon className={iconClass} icon={solid("search")} />
        </Link>
        <Link className={linkClass} to="/">
          <FontAwesomeIcon className={iconClass} icon={solid("bookmark")} />
        </Link>
        <Link className={linkClass} to="/">
          <FontAwesomeIcon className={iconClass} icon={solid("user")} />
        </Link>
        <Link className="pt-10" to="/">
          <img
            className="w-10 hover:rotate-12 hover:scale-125 transition-all"
            src={plusButton}
          />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
