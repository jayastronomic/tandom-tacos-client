import { request } from "./http/request";

export const fetchRecipes = async (): Promise<any> => {
  return await request("/api/v1/recipes", "GET");
};
