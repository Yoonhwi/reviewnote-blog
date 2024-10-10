import { ApiRoutes } from "@/app/constants/routes";
import { api, toUrl } from "./utils";

interface AddCommentParams {
  content: string;
  userId: number;
  postId: number;
}

const addComment = async (params: AddCommentParams) => {
  return api.post(ApiRoutes.Comments, params);
};

const getComments = async () => {
  return api.get(ApiRoutes.Comments);
};

const getComment = async (id: string) => {
  return api.get(toUrl(ApiRoutes.Comment, { id }));
};

const updateComment = async (id: string, params: AddCommentParams) => {
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
