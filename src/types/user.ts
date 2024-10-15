export type UserRole = "admin" | "user";

export interface UserResponseType {
  id: number;
  userId: string;
  profile: string;
  role: UserRole;
  nickname: string;
  createdAt: string;
}

export interface PostUser {
  userId: string;
  nickname: string;
  password: string;
  role: UserRole;
  profile: string;
}

export interface GetUser {
  user: UserResponseType;
}
