import { ApiRoutes } from "@/app/constants/routes";
import { PostAdd } from "../api/posts/route";
import {
  AddPostResponseType,
  GetPostsResponseType,
  PostResponseType,
} from "../types";
import { api, toUrl } from "./utils";

interface GetPostDetail {
  post: PostResponseType;
}

const addPost = async (params: PostAdd) => {
  return api.post<AddPostResponseType>(ApiRoutes.Posts, params);
};

const getPosts = async (page: string) => {
  return api.get<GetPostsResponseType>(`${ApiRoutes.Posts}?page=${page}`);
};

const getPost = async (id: string) => {
  return api.get<GetPostDetail>(toUrl(ApiRoutes.Post, { id }));
};

const updatePost = async (id: string, params: PostAdd) => {
  return api.put(toUrl(ApiRoutes.Post, { id }), params);
};

const deletePost = async (id: string) => {
  return api.delete(toUrl(ApiRoutes.Post, { id }));
};

const getUserPosts = async (id: string, page: string) => {
  return api.get<GetPostsResponseType>(
    `${toUrl(ApiRoutes.UserPosts, { id })}?page=${page}`
  );
};

const postRequest = {
  addPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getUserPosts,
};

export default postRequest;
