import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../../interfaces/recipe.interface";

const initialState: Recipe[] = [];

export const authUserRecipesSlice = createSlice({
  name: "authUserRecipes",
  initialState,
  reducers: {
    fetchAuthUserRecipesSuccess: (state, action: PayloadAction<Recipe[]>) =>
      action.payload,
  },
});

export const { fetchAuthUserRecipesSuccess } = authUserRecipesSlice.actions;
export default authUserRecipesSlice.reducer;
