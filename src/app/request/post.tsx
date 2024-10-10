import { ApiRoutes } from "@/app/constants/routes";
import { api, toUrl } from "./utils";

interface AddPostParams {
  title: string;
  content: string;
  userId: number;
}

const addPost = async (params: AddPostParams) => {
  return api.post(ApiRoutes.Posts, params);
};

const getPosts = async () => {
  return api.get(ApiRoutes.Posts);
};

const getPost = async (id: string) => {
  return api.get(toUrl(ApiRoutes.Post, { id }));
};

const updatePost = async (id: string, params: AddPostParams) => {
  return api.put(toUrl(ApiRoutes.Post, { id }), params);
};

const deletePost = async (id: string) => {
  return api.delete(toUrl(ApiRoutes.Post, { id }));
};

const postRequest = { addPost, getPosts, getPost, updatePost, deletePost };

export default postRequest;
