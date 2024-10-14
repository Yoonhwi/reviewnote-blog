import { UserContext } from "@/app/context/user-context";
import commentRequest, { CommentAdd } from "@/app/request/comment";
import { CommentResponseType, CommentType } from "@/app/types/comment";
import { formatISO } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import ModifyCommentForm from "./modify-comment-form";
import ReplyCommentForm from "./reply-comment-form";
import CommentChildCard from "./comment-child-card";

interface CommentCardProps {
  comment: CommentType;
  postId: number;
}

const CommentCard = ({ comment, postId }: CommentCardProps) => {
  const [isModify, setIsModify] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (isModify) setIsReply(false);
    if (isReply) setIsModify(false);
  }, [isModify, isReply]);

  const isMyComment = user?.id === comment.user.id;
  const createdAt = formatISO(comment.createdAt);

  return (
    <>
      <div className="flex gap-4 p-4 border-b-2 border-stone-100">
        <Image
          src={comment.user.profile}
          width={54}
          height={54}
          alt="user_img"
          className="rounded-full w-[54px] h-[54px]"
        />

        <div className="flex flex-col gap-4 flex-1">
          <div className="flex gap-6 justify-between">
            <div className="flex gap-6 items-center">
              <span className="font-bold">{comment.user.nickname}</span>
              <span className="text-sm text-gray-400">{createdAt}</span>
            </div>

            <div className="flex gap-2">
              {isMyComment && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsModify(!isModify)}
                    type="submit"
                    className="p-1"
                  >
                    {isModify ? "취소" : "수정"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      commentRequest.deleteComment(String(comment.id));
                    }}
                    className="p-1"
                  >
                    삭제
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                onClick={() => setIsReply(!isReply)}
                className="p-1"
              >
                {isReply ? "답글취소" : "답글"}
              </Button>
            </div>
          </div>

          {isModify ? (
            <ModifyCommentForm comment={comment} />
          ) : (
            <p>{comment.content}</p>
          )}

          {isReply && <ReplyCommentForm comment={comment} postId={postId} />}
        </div>
      </div>

      {comment.children.map((child) => {
        return <CommentChildCard comment={child} />;
      })}
    </>
  );
};

export default CommentCard;
