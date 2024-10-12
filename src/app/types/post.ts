import { UserResponseType } from "@/app/types";

export interface PostResponseType {
  id: number;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  mainImage: string;
  user: UserResponseType;
}
