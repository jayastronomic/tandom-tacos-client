import React from "react";
import { Recipe } from "../interfaces/recipe.interface";
import RecipeCard from "../components/RecipeCard";
import mascot from "../images/mascot.gif";

type RecipeContainerProps = {
  recipes: Recipe[];
};

const RecipeContainer = ({ recipes }: RecipeContainerProps): JSX.Element => {
  const RecipeContainerClass =
    "flex flex-col flex-1 items-center pt-20 space-y-8 overflow-auto" +
    " md:space-y-0 md:grid md:grid-cols-2  md:gap-x-56  md:pl-16 lg:grid-cols-3 lg:gap-24";

  if (recipes.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-400 font-semibold">
        <img className="w-64" alt="Tando Taco Mascot" src={mascot} />
        Oop! No Taco Recipes. Share one!
      </div>
    );
  }
  return (
    <div className={RecipeContainerClass}>
      {recipes.map((recipe) => {
        return <RecipeCard recipe={recipe} key={recipe.uuid} />;
      })}
    </div>
  );
};

export default RecipeContainer;
