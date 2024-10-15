"use client";
import { useEffect, useState } from "react";
import { PostCard, SearchPost } from "../components";
import { BaseLayout } from "./layouts";
import { PostResponseType } from "../types";
import postRequest from "../request/post";

const Home = () => {
  const [posts, setPosts] = useState<PostResponseType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { posts } = await postRequest.getPosts("1");
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  return (
    <BaseLayout>
      <div className="flex flex-col gap-2 items-center">
        <div className="p-6 flex flex-col gap-6 items-center justify-center">
          <h1 className="text-3xl font-bold">Welcome to</h1>
          <SearchPost />
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-y-6 gap-x-4 mb-16">
          {posts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Home;
