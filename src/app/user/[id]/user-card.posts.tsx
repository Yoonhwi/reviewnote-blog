"use client";

import { Pagination } from "@/components";
import { UserContext } from "@/context/user-context";
import postRequest from "@/request/post";
import { PostResponseType } from "@/types";
import { CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserCardProps } from "./user-card";
import TextPostCard from "./user-card.post-card";

const UserCardPosts = ({ user }: UserCardProps) => {
  const [posts, setPosts] = useState<PostResponseType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);

  const { user: loginUser } = useContext(UserContext);
  const isMyPage = loginUser?.id === user.id;

  const fetchPosts = useCallback(
    async (page: number) => {
      const { posts, totalPages } = await postRequest.getUserPosts(
        String(user.id),
        page.toString()
      );
      setPosts(posts);
      setTotalPages(totalPages);
    },
    [user.id]
  );

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, fetchPosts]);

  return (
    <div className="flex flex-col gap-2 w-3/4">
      <Label>{isMyPage ? "내 게시글" : `${user.nickname}님의 게시글`}</Label>
      <CardDescription>
        {isMyPage
          ? "내 게시글을 모아볼 수 있어요!"
          : "다른 사용자의 게시글을 모아볼 수 있어요!"}
      </CardDescription>
      <div className="flex flex-col gap-2 pb-4">
        {posts.map((post) => {
          return <TextPostCard post={post} key={post.id} />;
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UserCardPosts;
