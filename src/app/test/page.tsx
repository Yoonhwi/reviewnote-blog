"use client";
import Button from "../components/button";
import commentRequest from "../request/comment";
import postRequest from "../request/post";
import userRequest from "../request/user";

const Test = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row gap-4">
        <span>user api</span>
        <Button
          variant="outline"
          onClick={() => {
            userRequest.addUser({
              userId: "test1",
              password: "test",
              profile: "test",
              role: "test",
              nickname: "test1",
            });
          }}
        >
          Create User
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            userRequest.getUsers();
          }}
        >
          get Users
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            userRequest.getUser("1");
          }}
        >
          get User
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            userRequest.updateUser("6", {
              userId: "updateTest",
              password: "test",
              profile: "test",
              role: "test",
              nickname: "updateTest",
            });
          }}
        >
          Update User
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            userRequest.deleteUser("7");
          }}
        >
          Delete User
        </Button>
      </div>
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
      <div className="flex flex-row gap-4">
        {/** user 8 post 4  content userId postId*/}
        <span>comment api</span>
        <Button
          onClick={() => {
            commentRequest.addComment({
              content: "test",
              userId: 8,
              postId: 4,
            });
          }}
        >
          Post Comment
        </Button>
        <Button
          onClick={() => {
            commentRequest.getComments();
          }}
        >
          Get Comments
        </Button>
        <Button
          onClick={() => {
            commentRequest.getComment("1");
          }}
        >
          Get Comment
        </Button>
        <Button
          onClick={() => {
            commentRequest.updateComment("1", {
              content: "updateTest",
              userId: 8,
              postId: 4,
            });
          }}
        >
          Update Comment
        </Button>
        <Button
          onClick={() => {
            commentRequest.deleteComment("1");
          }}
        >
          Delete Comment
        </Button>
      </div>
    </div>
  );
};

export default Test;
