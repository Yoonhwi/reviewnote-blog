import { UserResponseType } from "./user";

export interface CommentResponseType {
  id: number;
  content: string;
  postId: number;
  userid: number;
  parentId?: number;
  createdAt: string;
  user: UserResponseType;
}
