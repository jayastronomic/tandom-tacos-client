import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import recipesReducer from "../features/recipes/recipesSlice";
import recipeReducer from "../features/recipes/recipeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
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
