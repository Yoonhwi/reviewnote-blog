"use client";

import { Dialog, Pagination, PostCard, SearchPost } from "@/app/components";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import { PageRoutes } from "../constants/routes";
import { UserContext } from "../context/user-context";
import { BaseLayout } from "../layouts";
import postRequest from "../request/post";
import { PostResponseType } from "../types";

const BoardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState<PostResponseType[]>([]);
  const { user } = useContext(UserContext);

  const fetchPosts = useCallback(
    async (page: number) => {
      const { posts, totalPages } = await postRequest.getPosts(page.toString());
      console.log("totalPages", totalPages);
      setPosts(posts);
      setTotalPages(totalPages);
    },
    [currentPage]
  );

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  return (
    <BaseLayout>
      <div className="flex flex-col gap-4 py-16">
        <div className="flex justify-between items-center">
          {user ? (
            <Link href={PageRoutes.Post} passHref>
              <Button>글 작성</Button>
            </Link>
          ) : (
            <Dialog
              trigger={<Button>글 작성</Button>}
              title="로그인이 필요합니다"
              description="로그인 후 글 작성이 가능합니다"
              content={
                <Link href={PageRoutes.Login} passHref>
                  <Button>로그인 페이지로</Button>
                </Link>
              }
            />
          )}

          <div className="flex justify-end">
            <SearchPost />
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-y-6 gap-x-4">
          {posts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })}
        </div>

        <div className="flex items-center h-32">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPages}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default BoardPage;
