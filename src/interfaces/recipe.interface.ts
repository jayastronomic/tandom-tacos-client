import { Ingredient } from "./ingredient.interface";

export interface Recipe {
  uuid: string;
  name: string;
  directions: string[];
  restrictions: string[];
  ingredients: Ingredient[];
  user_id?: number;
  user_uuid?: string;
}
