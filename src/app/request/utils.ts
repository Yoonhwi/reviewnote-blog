import { ApiRoutes, PageRoutes } from "../constants/routes";
import { compile } from "path-to-regexp";

type Api = {
  get: <T>(url: string) => Promise<T>;
  post: <T>(url: string, params?: object) => Promise<T>;
  put: <T>(url: string, params?: object) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
};

export const toUrl = (path: ApiRoutes | PageRoutes, params?: object) =>
  compile(path, { encode: encodeURIComponent })(params);

export const api: Api = {
  get: async (url) => {
    console.log(url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("api error");
    }
    return response.json();
  },

  post: async (url, params) => {
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("api error");
    }
    return response.json();
  },

  put: async (url, params) => {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      throw new Error("api error");
    }
    return response.json();
  },

  delete: async (url) => {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("api error");
    }
    return response.json();
  },
};
