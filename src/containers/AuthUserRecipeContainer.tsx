import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import RecipeCard from "../components/RecipeCard";
import { fetchAuthUserRecipesSuccess } from "../features/recipes/authUserRecipesSlice";
import { User } from "../interfaces/user.interface";
import { fetchAuthUserRecipes } from "../network/Recipe";

type AuthUserRecipeContainerProps = {
  authUser: User;
};

const AuthUserRecipeContainer = ({
  authUser,
}: AuthUserRecipeContainerProps): JSX.Element => {
  const dispatch = useDispatch();
  const authUserRecipes = useAppSelector((state) => state.authUserRecipes);

  useEffect(() => {
    const fetchedAuthUserRecipes = async () => {
      dispatch(
        fetchAuthUserRecipesSuccess(await fetchAuthUserRecipes(authUser.uuid))
      );
    };
    fetchedAuthUserRecipes();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center pt-10 space-y-8">
      <h1 className="text-3xl">My Recipes</h1>
      {authUserRecipes.map((recipe) => {
        return <RecipeCard key={recipe.uuid} recipe={recipe} />;
      })}
    </div>
  );
};

export default AuthUserRecipeContainer;
