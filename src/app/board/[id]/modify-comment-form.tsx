import commentRequest, { CommentAdd } from "@/app/request/comment";
import { _CommentType, CommentType } from "@/app/types/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface ModifyCommentFormProps {
  comment: CommentType | _CommentType;
  callback?: () => void;
  setIsModify: Dispatch<SetStateAction<boolean>>;
}

const ModifyCommentForm = ({
  comment,
  callback,
  setIsModify,
}: ModifyCommentFormProps) => {
  const { register, handleSubmit } = useForm<CommentAdd>({
    defaultValues: {
      content: comment.content,
    },
  });
  const { toast } = useToast();

  const onSubmit = (data: CommentAdd) => {
    const body = {
      ...data,
    };

    commentRequest
      .updateComment(String(comment.id), body)
      .then(callback)
      .then(() => {
        setIsModify(false);
        toast({
          title: "댓글 수정 성공",
          description: "댓글이 성공적으로 수정되었습니다.",
          duration: 3000,
        });
      });
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
