import commentRequest, { CommentAdd } from "@/app/request/comment";
import { CommentType } from "@/app/types/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

interface ReplyCommentFormProps {
  comment: CommentType;
  postId: number;
}

const defaultValues = {
  content: "",
};

const ReplyCommentForm = ({ comment, postId }: ReplyCommentFormProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = (data: CommentAdd) => {
    const parentId = comment.id;
    const body = {
      ...data,
      parentId,
    };
    commentRequest.addComment(String(postId), body);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        placeholder="댓글을 입력해주세요."
        className="min-h-28"
        {...register("content", { required: true })}
      />
      <Button type="submit">등록</Button>
    </form>
  );
};

export default ReplyCommentForm;
