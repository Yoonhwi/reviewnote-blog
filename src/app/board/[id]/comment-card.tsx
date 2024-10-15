import { UserContext } from "@/context/user-context";
import commentRequest from "@/request/comment";
import { CommentType } from "@/types/comment";
import { formatISO } from "@/utils";
import { RoundImage } from "@/components";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useContext, useEffect, useState } from "react";
import CommentChildCard from "./comment-child-card";
import ModifyCommentForm from "./modify-comment-form";
import ReplyCommentForm from "./reply-comment-form";

interface CommentCardProps {
  comment: CommentType;
  postId: number;
  callback?: () => void;
}

const CommentCard = ({ comment, postId, callback }: CommentCardProps) => {
  const [isModify, setIsModify] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const { user } = useContext(UserContext);
  const { toast } = useToast();

  useEffect(() => {
    if (isModify) setIsReply(false);
    if (isReply) setIsModify(false);
  }, [isModify, isReply]);

  const isMyComment = user?.id === comment.user.id || user?.role === "admin";
  const createdAt = formatISO(comment.createdAt);

  return (
    <>
      <div className="flex gap-4 p-4 border-b-2 border-stone-100">
        <RoundImage imgSrc={comment.user.profile} size={54} alt="user_img" />
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
                      commentRequest
                        .deleteComment(String(comment.id))
                        .then(() =>
                          toast({
                            title: "댓글 삭제 성공",
                            description: "댓글이 성공적으로 삭제되었습니다.",
                            duration: 3000,
                          })
                        )
                        .then(callback);
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
            <ModifyCommentForm
              comment={comment}
              callback={callback}
              setIsModify={setIsModify}
            />
          ) : (
            <p>{comment.content}</p>
          )}

          {isReply && (
            <ReplyCommentForm
              comment={comment}
              postId={postId}
              callback={callback}
              setIsReply={setIsReply}
            />
          )}
        </div>
      </div>

      {comment.children.map((child) => {
        return (
          <CommentChildCard
            comment={child}
            key={child.id}
            callback={callback}
          />
        );
      })}
    </>
  );
};

export default CommentCard;
