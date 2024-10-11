import { ApiRoutes } from "@/app/constants/routes";
import { api, toUrl } from "./utils";
import { PostAdd } from "../api/posts/route";

const addPost = async (params: PostAdd) => {
  return api.post(ApiRoutes.Posts, params);
};

const getPosts = async () => {
  return api.get(ApiRoutes.Posts);
};

const getPost = async (id: string) => {
  return api.get(toUrl(ApiRoutes.Post, { id }));
};

const updatePost = async (id: string, params: PostAdd) => {
  return api.put(toUrl(ApiRoutes.Post, { id }), params);
};

const deletePost = async (id: string) => {
  return api.delete(toUrl(ApiRoutes.Post, { id }));
};

const postRequest = { addPost, getPosts, getPost, updatePost, deletePost };

export default postRequest;
