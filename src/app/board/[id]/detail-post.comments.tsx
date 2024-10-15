import { Pagination } from "@/components";
import commentRequest, { CommentAdd } from "@/request/comment";
import { CommentType } from "@/types/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommentCard from "./comment-card";

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

  const { register, handleSubmit, reset } = useForm<CommentAdd>({
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
    [postId]
  );

  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage, fetchComments]);

  const onSubmit = (data: CommentAdd) => {
    commentRequest
      .addComment(String(postId), data)
      .then(() => {
        fetchComments(currentPage);
      })
      .then(() => {
        reset();
        toast({
          title: "댓글 작성 성공",
          description: "댓글이 성공적으로 작성되었습니다.",
          duration: 3000,
        });
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
            <CommentCard
              comment={comment}
              key={comment.id}
              postId={postId}
              callback={() => fetchComments(currentPage)}
            />
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
