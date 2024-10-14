"use client";
import { UserResponseType } from "@/app/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserCardPosts from "./user-card.posts";
import UserCardProfile from "./user-card.profile";
import { useContext } from "react";
import { UserContext } from "@/app/context/user-context";

export interface UserCardProps {
  user: UserResponseType;
}

const UserCard = ({ user }: UserCardProps) => {
  const { user: loginUser } = useContext(UserContext);
  const isMyPage = loginUser?.id === user.id;

  return (
    <Card className="flex flex-col  w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {isMyPage ? "MY PAGE" : `${user.nickname}님의 PAGE`}
        </CardTitle>
        <CardDescription>
          {isMyPage
            ? "프로필 이미지를 변경하고, 내 게시글을 모아볼 수 있어요!"
            : "다른 사용자의 프로필 이미지와 게시글을 확인해보세요!"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8">
          <UserCardProfile user={user} />
          <UserCardPosts user={user} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
