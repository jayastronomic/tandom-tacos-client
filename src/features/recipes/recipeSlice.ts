import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../../interfaces/recipe.interface";

const initialState: Recipe = {
  uuid: "",
  name: "",
  directions: [],
  restrictions: [],
  ingredients: [],
  user_uuid: "",
  user_id: 0,
  user_username: "",
  image_exist: false,
};
export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    fetchRecipeSuccess: (state, action: PayloadAction<Recipe>) => {
      return action.payload;
    },
  },
});

export const { fetchRecipeSuccess } = recipeSlice.actions;
export default recipeSlice.reducer;
