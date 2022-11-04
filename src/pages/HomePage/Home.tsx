import { FC, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import RecipeContainer from "../../containers/RecipeContainer";
import { fetchRecipes } from "../../network/Recipe";
import { fetchRecipesSuccess } from "../../features/recipes/recipesSlice";

const Home: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const recipes = useAppSelector((state) => state.recipes);
  useEffect(() => {
    const fetchedRecipes = async () => {
      dispatch(fetchRecipesSuccess(await fetchRecipes()));
    };
    fetchedRecipes();
  }, []);
  console.log(recipes);
  return (
    <div className="flex flex-col flex-1 h-screen bg-orange-50">
      <RecipeContainer recipes={recipes} />
    </div>
  );
};

export default Home;
