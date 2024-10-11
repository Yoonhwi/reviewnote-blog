"use client";
import Button from "../components/button";
import commentRequest from "../request/comment";

const ApiComment = () => {
  return (
    <div className="flex flex-row gap-4">
      {/** user 8 post 4  content userId postId*/}
      <span>comment api</span>
      <Button
        onClick={() => {
          commentRequest.addComment(
            {
              content: "test",
              userId: 13,
            },
            "4"
          );
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
  );
};

export default ApiComment;
