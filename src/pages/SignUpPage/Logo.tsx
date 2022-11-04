import React, { FC, useEffect, useState } from "react";
import logo from "../../images/tandem_taco_logo.png";
import Tandem from "./Tandem";

const Logo: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-centr items-center space-y-8">
      <Tandem />
      <img className="w-64" alt="Tandem Taco Logo" src={logo} />

      <div className="flex flex-col font-medium text-2xl text-center font-milkhoney text-gray-700">
        <p>Want a new taco recipe!? </p>
        <p> Tandem Taco is here to help.</p>
      </div>
    </div>
  );
};

export default Logo;
