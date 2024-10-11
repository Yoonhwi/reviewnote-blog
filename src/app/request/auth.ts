import { ApiRoutes } from "../constants/routes";
import { api, toUrl } from "./utils";

export const login = async () => {
  return api.post(toUrl(ApiRoutes.AuthLogin));
};
