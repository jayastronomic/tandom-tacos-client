import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { fetchRecipeSuccess } from "../../features/recipes/recipeSlice";
import { showRecipe } from "../../network/Recipe";
import taco from "../../images/default.png";

const Recipe: FC = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();
  const recipe = useAppSelector((state) => state.recipe);
  useEffect(() => {
    const fetchedRecipe = async () => {
      dispatch(fetchRecipeSuccess(await showRecipe(location.state.uuid)));
    };
    fetchedRecipe();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-auto bg-orange-50 flex-1 space-y-10 pb-4 text-gray-800">
      <div className="h-46">
        {recipe.image_exist ? (
          <img
            className="object-cover w-full h-full"
            alt=""
            src={recipe.image_url}
          />
        ) : (
          <img className="object-cover w-full h-full" alt="" src={taco} />
        )}
      </div>

      <div className="flex space-x-4 items-center text-sm text-right py-1 text-gray-600 font-semibold bg-white rounded px-4">
        {!!recipe.user_id ? (
          <p className="text-xl">
            Recipe by{" "}
            <span className="hover:underline text-blue-500">
              {recipe.user_username}
            </span>
          </p>
        ) : (
          <p className="text-xl">
            Recipe by <span className="text-orange-300">Tandem</span>
          </p>
        )}
      </div>

      <div className="flex flex-col px-4 space-y-2">
        <h1 className="text-5xl font-extralight">{recipe.name}</h1>
        <h2 className="text-2xl font-medium">Ingredients</h2>
        <div className="space-y-3">
          {recipe.ingredients.map((recipe, i) => {
            return (
              <p key={i}>
                - {recipe.quantity} {recipe.name}
              </p>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col px-4 space-y-4">
        <h1 className="text-2xl font-medium">Directions</h1>
        {recipe.directions.map((direction, i) => {
          return (
            <div key={i} className="flex flex-col">
              <h6 className="font-semibold"> Step {i + 1}</h6>
              <p className="break-words">{direction}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recipe;
