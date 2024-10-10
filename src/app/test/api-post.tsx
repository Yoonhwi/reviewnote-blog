"use client";
import Button from "../components/button";
import postRequest from "../request/post";

const ApiPost = () => {
  return (
    <div className="flex flex-row gap-4">
      <span>post api</span>
      <Button
        variant="primary"
        onClick={() => {
          postRequest.addPost({
            title: "test",
            content: "test",
            userId: 8,
          });
        }}
      >
        Create Post
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          postRequest.getPosts();
        }}
      >
        Get Posts
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          postRequest.getPost("1");
        }}
      >
        Get Post
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          postRequest.updatePost("1", {
            title: "updateTest",
            content: "updateTest",
            userId: 7,
          });
        }}
      >
        Update Post
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          postRequest.deletePost("1");
        }}
      >
        Delete Post
      </Button>
    </div>
  );
};

export default ApiPost;
