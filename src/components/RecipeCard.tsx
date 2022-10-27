import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";

const RecipeCard: FC = (): JSX.Element => {
  const tagClass =
    "border-b border-gray-400 bg-black bg-opacity-60 px-1 transition hover:translate-x-2";
  return (
    <div className="flex justify-center items-center h-screen bg-orange-50">
      <div className="flex flex-col rounded-2xl border-b h-96 w-96 drop-shadow  overflow-hidden transition duration-200 hover:drop-shadow-2xl hover:scale-[1.05] cursor-pointer">
        <div className="relative h-1/2 overflow-hidden rounded-t">
          <img
            className="object-cover w-full h-full"
            alt=""
            src="https://urbanmatter.com/chicago/wp-content/uploads/2016/08/61658265_1031292940394672_2473784691572867072_o.jpg"
          />
          <div className="absolute flex flex-col  justify-center items-center inset-0 bg-opacity-40 w-full h-full bg-neutral-900 ">
            <p className="text-white font-extralight text-4xl">Steak Tacos</p>
            <div className="grid text-white text-sm border-gray-400 font-extralight self-start">
              <span className={tagClass}>vegan</span>
              <span className={tagClass}>gluten-free</span>
              <span className={tagClass}>vegitarian</span>
              <span className={tagClass}>dairy-free</span>
              <span className={tagClass}>halal</span>
              <span className={tagClass}>kosher</span>
              <span className={tagClass}>nuts</span>
            </div>
          </div>
        </div>
        <div className="bg-white h-1/2 shadow px-4 pt-4">
          <p className="text-sm text-gray-700 font-light line-clamp-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex justify-between items-center text-sm text-right pt-2 text-gray-600 font-semibold">
            <FontAwesomeIcon icon={regular("heart")} size="xl" />
            <p>
              Recipe by <span className="hover:underline">Jake</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
