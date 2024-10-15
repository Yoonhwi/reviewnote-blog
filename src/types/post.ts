import { UserResponseType } from "@/types";

export interface AddPostResponseType {
  post: PostResponseType;
}

export interface PostResponseType {
  id: number;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  mainImg: string;
  user: UserResponseType;
}

export interface GetPostsResponseType {
  posts: PostResponseType[];
  totalPages: number;
}
