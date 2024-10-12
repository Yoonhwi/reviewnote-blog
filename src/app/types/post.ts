import { UserResponseType } from "@/app/types";

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  mainImage: string;
  user: UserResponseType;
}

export interface PostResponseType {
  id: number;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  mainImage: string;
  user: UserResponseType;
}
