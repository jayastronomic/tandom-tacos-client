import React, { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import AddRecipeModal from "./AddRecipeModal";

const AppWrapper: FC = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="relative flex h-screen flex-grow">
      <NavBar setShow={setShow} />
      <Outlet />
      {show && <AddRecipeModal setShow={setShow} />}
    </div>
  );
};

export default AppWrapper;
