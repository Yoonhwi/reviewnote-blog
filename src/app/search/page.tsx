"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Pagination, PostCard, SearchPost } from "../../components";
import { BaseLayout } from "../layouts";
import postRequest from "../request/post";
import { PostResponseType } from "../types";

const SearchPage = () => {
  const [posts, setPosts] = useState<PostResponseType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const fetchSearchPosts = useCallback(
    async (page: number) => {
      if (!query) return;
      const { posts, totalPages } = await postRequest.getSearchPosts(
        query,
        page.toString()
      );
      setPosts(posts);
      setTotalPages(totalPages);
    },
    [query]
  );

  useEffect(() => {
    fetchSearchPosts(currentPage);
  }, [query, currentPage, fetchSearchPosts]);

  return (
    <BaseLayout>
      <Suspense>
        <div className="flex flex-col gap-4 py-16 items-center">
          <SearchPost />
          <div className="w-full">
            <h1 className="text-2xl font-bold">
              <span className="underline underline-offset-8">{query}</span>{" "}
              검색결과
            </h1>
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
      </Suspense>
    </BaseLayout>
  );
};

export default SearchPage;
