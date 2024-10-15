"use client";

import { BaseLayout } from "@/app/layouts";
import postRequest from "@/app/request/post";
import { useEffect, useState } from "react";
import DetailPostCard from "./detail-post-card";
import { Spinner } from "@/components";
import { PostResponseType } from "@/app/types";

const DetailPostPage = ({ params }: { params: { id: number } }) => {
  const [post, setPost] = useState<PostResponseType | null>(null);

  useEffect(() => {
    postRequest.getPost(params.id.toString()).then((res) => {
      setPost(res.post);
    });
  }, [params.id]);

  return (
    <BaseLayout>
      <div className="flex flex-col justify-center items-center gap-2 min-h-[800px]">
        {post ? <DetailPostCard post={post} /> : <Spinner />}
      </div>
    </BaseLayout>
  );
};

export default DetailPostPage;
