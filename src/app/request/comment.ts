import { ApiRoutes } from "@/app/constants/routes";
import { api, toUrl } from "./utils";

interface CommentAdd {
  content: string;
  userId: number;
}

const addComment = async (params: CommentAdd, id: string) => {
  return api.post(toUrl(ApiRoutes.Comments, { id }), params);
};

const getComments = async (id: string) => {
  return api.get(toUrl(ApiRoutes.Comments, { id }));
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
