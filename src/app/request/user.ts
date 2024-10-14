import { ApiRoutes } from "@/app/constants/routes";
import { api, toUrl } from "./utils";
import { GetUser, UserResponseType } from "../types";

interface UserAdd {
  userId: string;
  password: string;
  profile: string;
  role: string;
  nickname: string;
}

interface User {
  userId: string;
  profile: string;
  role: string;
  nickname: string;
}

const addUser = async (params: UserAdd) => {
  return api.post<Response>(ApiRoutes.Users, params);
};

const getUsers = async () => {
  return api.get(ApiRoutes.Users);
};

const getUser = async (id: string) => {
  return api.get<GetUser>(toUrl(ApiRoutes.User, { id }));
};

const updateUser = async (id: string, params: object) => {
  return api.put(toUrl(ApiRoutes.User, { id }), params);
};

const deleteUser = async (id: string) => {
  return api.delete(toUrl(ApiRoutes.User, { id }));
};

const getMe = async () => {
  return api.get(toUrl(ApiRoutes.Me));
};
const checkIdExist = async (userId: string) => {
  return api.post(toUrl(ApiRoutes.CheckId), { userId });
};

const checkNicknameExist = async (nickname: string) => {
  return api.post(toUrl(ApiRoutes.CheckNickname), { nickname });
};

const userLogin = async (userId: string, password: string) => {
  return api.post(toUrl(ApiRoutes.AuthLogin), { userId, password });
};

const userLogout = async () => {
  return api.post(toUrl(ApiRoutes.AuthLogout));
};

const userRequest = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  checkIdExist,
  checkNicknameExist,
  userLogin,
  userLogout,
};

export default userRequest;
