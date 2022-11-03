import { request } from "./http/request";

export const fetchRecipes = async (): Promise<any> => {
  return await request("/api/v1/recipes", "GET");
};

export const createRecipe = async (data: object): Promise<any> => {
  return await request("/api/v1/recipes", "POST", data);
};

export const showRecipe = async (id: string): Promise<any> => {
  return await request(`/api/v1/recipes/${id}`, "GET");
};

export const fetchAuthUserRecipes = async (id: string): Promise<any> => {
  return await request(`/api/v1/users/${id}/recipes`, "GET");
};
