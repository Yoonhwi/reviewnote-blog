import commentRequest, { CommentAdd } from "@/request/comment";
import { CommentType } from "@/types/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface ReplyCommentFormProps {
  comment: CommentType;
  postId: number;
  callback?: () => void;
  setIsReply: Dispatch<SetStateAction<boolean>>;
}

const defaultValues = {
  content: "",
};

const ReplyCommentForm = ({
  comment,
  postId,
  callback,
  setIsReply,
}: ReplyCommentFormProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });
  const { toast } = useToast();

  const onSubmit = (data: CommentAdd) => {
    const parentId = comment.id;
    const body = {
      ...data,
      parentId,
    };
    commentRequest
      .addComment(String(postId), body)
      .then(callback)
      .then(() => {
        setIsReply(false);
        toast({
          title: "댓글 작성 성공",
          description: "댓글이 성공적으로 작성되었습니다.",
          duration: 3000,
        });
      });
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
