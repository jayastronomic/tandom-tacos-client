import { request } from "./http/request";

export const createUserIfNotExist = async (payload: object): Promise<any> => {
  return await request("/api/v1/users", "POST", payload);
};

export const login = async (payload: object): Promise<any> => {
  return await request("/api/v1/login", "POST", payload);
};

export const logout = async (): Promise<any> => {
  return await request("/api/v1/logout", "DELETE");
};

export const loginStatus = async (): Promise<any> => {
  return await request("/api/v1/logged_in", "GET");
};
