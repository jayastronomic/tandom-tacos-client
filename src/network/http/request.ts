const backend: string =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

export const request = async (
  path: string,
  method: string,
  payload: object | null = null,
  headers: object = {}
): Promise<any> => {
  const API: string = backend + path;
  const options: any = {};

  options.method = method;
  if (path !== "/api/v1/logout") {
    options.headers = headers;
    options.headers["Access-Control-Allow-Origin"] = "*";
    if (!(method === "GET" || method === "DELETE")) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(payload) || {};
    }
  }
  options.credentials = "include";

  const response = await fetch(API, options);
  const data = await response.json();
  return data;
};
