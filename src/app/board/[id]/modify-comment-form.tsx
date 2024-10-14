import commentRequest, { CommentAdd } from "@/app/request/comment";
import { _CommentType, CommentType } from "@/app/types/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

interface ModifyCommentFormProps {
  comment: CommentType | _CommentType;
}

const ModifyCommentForm = ({ comment }: ModifyCommentFormProps) => {
  const { register, handleSubmit } = useForm<CommentAdd>({
    defaultValues: {
      content: comment.content,
    },
  });

  const onSubmit = (data: CommentAdd) => {
    const body = {
      ...data,
    };
    commentRequest.updateComment(String(comment.id), body);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        className="min-h-28"
        {...register("content", { required: true })}
      />
      <Button type="submit">수정완료</Button>
    </form>
  );
};

export default ModifyCommentForm;
