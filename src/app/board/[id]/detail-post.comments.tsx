import { Pagination } from "@/app/components";
import { CommentResponseType, CommentType } from "@/app/types/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CommentCard from "./comment-card";
import { useForm } from "react-hook-form";
import commentRequest, { CommentAdd } from "@/app/request/comment";
import { useCallback, useEffect, useState } from "react";

interface DetailPostCommentsProps {
  postId: number;
}

const defaultValues: CommentAdd = {
  content: "",
};

const DetailPostComments = ({ postId }: DetailPostCommentsProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { register, handleSubmit } = useForm<CommentAdd>({
    defaultValues,
  });

  const fetchComments = useCallback(
    async (page: number) => {
      const { comments, totalPage } = await commentRequest.getComments(
        String(postId),
        page.toString()
      );
      setComments(comments);
      setTotalPages(totalPage);
    },
    [currentPage]
  );

  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage]);

  const onSubmit = (data: CommentAdd) => {
    commentRequest.addComment(String(postId), data).then(() => {
      //새로고침을 하든 새로페칭을 하든 해야함.
    });
  };

  return (
    <div className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <form className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-md font-bold">댓글을 작성해보세요!</h1>
          <Button type="submit">등록</Button>
        </div>

        <Textarea
          placeholder="댓글을 입력해주세요."
          className="min-h-28"
          {...register("content", {
            required: true,
          })}
        />
      </form>

      <div className="flex flex-col">
        {comments.map((comment) => {
          return (
            <CommentCard comment={comment} key={comment.id} postId={postId} />
          );
        })}
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPage={totalPages}
        />
      </div>
    </div>
  );
};

export default DetailPostComments;
