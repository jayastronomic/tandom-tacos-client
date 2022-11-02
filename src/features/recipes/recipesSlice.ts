import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../../interfaces/recipe.interface";

const initialState: Recipe[] = [];

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    fetchRecipesSuccess: (state, action: PayloadAction<Recipe[]>) =>
      action.payload,
    createRecipeSuccess: (state, action: PayloadAction<Recipe>) => {
      state.unshift(action.payload);
    },
  },
});

export const { fetchRecipesSuccess, createRecipeSuccess } =
  recipesSlice.actions;
export default recipesSlice.reducer;
