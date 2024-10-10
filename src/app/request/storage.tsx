import { ApiRoutes } from "../constants/routes";
import { api } from "./utils";

interface uploadResponse {
  data: string;
}

export const addImage = async (formData: FormData): Promise<uploadResponse> => {
  return api.upload(ApiRoutes.Storage, formData);
};
