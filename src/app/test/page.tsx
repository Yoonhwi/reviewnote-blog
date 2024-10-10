"use client";
import ApiComment from "./api-comment";
import ApiPost from "./api-post";
import ApiStorage from "./api-storage";
import ApiUser from "./api-user";

const Test = () => {
  return (
    <div className="flex flex-col gap-8">
      <ApiUser />
      <ApiPost />
      <ApiComment />
      <ApiStorage />
    </div>
  );
};

export default Test;
