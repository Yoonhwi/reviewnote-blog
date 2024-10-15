import { ApiRoutes } from "@/constants/routes";
import { api, toUrl } from "./utils";
import { CommentResponseType } from "../types/comment";

export interface CommentAdd {
  content: string;
  parentId?: number;
}

const addComment = async (id: string, params: CommentAdd) => {
  return api.post(toUrl(ApiRoutes.Comments, { id }), params);
};

const getComments = async (id: string, page: string) => {
  return api.get<CommentResponseType>(
    `${toUrl(ApiRoutes.Comments, { id })}/?page=${page}`
  );
};

const getComment = async (id: string) => {
  return api.get(toUrl(ApiRoutes.Comment, { id }));
};

const updateComment = async (id: string, params: CommentAdd) => {
  return api.put(toUrl(ApiRoutes.Comment, { id }), params);
};

const deleteComment = async (id: string) => {
  return api.delete(toUrl(ApiRoutes.Comment, { id }));
};

const commentRequest = {
  addComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
};

export default commentRequest;
