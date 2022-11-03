import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import recipesReducer from "../features/recipes/recipesSlice";
import recipeReducer from "../features/recipes/recipeSlice";
import authUserRecipesReducer from "../features/recipes/authUserRecipesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    authUserRecipes: authUserRecipesReducer,
    recipes: recipesReducer,
    recipe: recipeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
