import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { fetchRecipeSuccess } from "../../features/recipes/recipeSlice";
import { showRecipe } from "../../network/Recipe";

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
        <img
          className="object-cover w-full h-full"
          alt=""
          src="https://urbanmatter.com/chicago/wp-content/uploads/2016/08/61658265_1031292940394672_2473784691572867072_o.jpg"
        />
      </div>

      <div className="flex flex-col px-4 space-y-2">
        <h1 className="text-5xl font-extralight">{recipe.name}</h1>
        <h2 className="text-2xl font-medium">Ingredients</h2>
        <div className="space-y-3">
          {recipe.ingredients.map((recipe) => {
            return (
              <p>
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
            <div className="flex flex-col">
              <h6 className="font-semibold"> Step {i + 1}</h6>
              <p className="break-all">{direction}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recipe;
