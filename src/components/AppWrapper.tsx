import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const AppWrapper: FC = (): JSX.Element => {
  return (
    <div className="flex h-screen flex-grow">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AppWrapper;
