import { Pagination } from "@/app/components";
import { CommentResponseType } from "@/app/types/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CommentCard from "./comment-card";

const dummyComments: CommentResponseType[] = [
  {
    id: 1,
    content: "댓글1",
    postId: 1,
    userid: 1,
    parentId: 1,
    createdAt: "2021-09-20T00:00:00",
    user: {
      id: 1,
      userId: "test",
      profile: process.env.NEXT_PUBLIC_NONE_USER!,
      role: "user",
      nickname: "test",
      createdAt: "2021-09-20T00:00:00",
    },
  },
  {
    id: 1,
    content: "댓글1",
    postId: 1,
    userid: 1,
    parentId: 1,
    createdAt: "2021-09-20T00:00:00",
    user: {
      id: 1,
      userId: "test",
      profile: process.env.NEXT_PUBLIC_NONE_USER!,
      role: "user",
      nickname: "test",
      createdAt: "2021-09-20T00:00:00",
    },
  },
  {
    id: 1,
    content: "댓글1",
    postId: 1,
    userid: 1,
    parentId: 1,
    createdAt: "2021-09-20T00:00:00",
    user: {
      id: 1,
      userId: "test",
      profile: process.env.NEXT_PUBLIC_NONE_USER!,
      role: "user",
      nickname: "test",
      createdAt: "2021-09-20T00:00:00",
    },
  },
];

const DetailPostComments = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-md font-bold">댓글을 작성해보세요!</h1>
        <Button variant={"outline"}>등록</Button>
      </div>

      <Textarea placeholder="댓글을 입력해주세요." className="min-h-28" />

      <div className="flex flex-col gap-2">
        {dummyComments.map((comment) => {
          return <CommentCard comment={comment} key={comment.id} />;
        })}
        <Pagination />
      </div>
    </div>
  );
};

export default DetailPostComments;
