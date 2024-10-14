import { UserResponseType } from "./user";

export interface _CommentType {
  id: number;
  content: string;
  postId: number;
  userid: number;
  parentId?: number;
  createdAt: string;
  user: UserResponseType;
}

export interface CommentType extends _CommentType {
  children: _CommentType[];
}

export interface CommentResponseType {
  comments: CommentType[];
  totalPage: number;
}
