import { Recipe } from "./recipe.interface";

export interface User {
  id: number;
  uuid: string;
  username: string;
  name: string;
  email: string;
  logged_in: boolean;
  recipes: Recipe[];
}
