import { ApiRoutes } from "@/app/constants/routes";
import { api, toUrl } from "./utils";

interface AddUserParams {
  userId: string;
  password: string;
  profile: string;
  role: string;
  nickname: string;
}

const addUser = async (params: AddUserParams) => {
  return api.post(ApiRoutes.Users, params);
};

const getUsers = async () => {
  return api.get(ApiRoutes.Users);
};

const getUser = async (id: string) => {
  console.log("url:", toUrl(ApiRoutes.User, { id }));
  return api.get(toUrl(ApiRoutes.User, { id }));
};

const updateUser = async (id: string, params: AddUserParams) => {
  return api.put(toUrl(ApiRoutes.User, { id }), params);
};

const deleteUser = async (id: string) => {
  return api.delete(toUrl(ApiRoutes.User, { id }));
};

const userRequest = { addUser, getUsers, getUser, updateUser, deleteUser };

export default userRequest;
