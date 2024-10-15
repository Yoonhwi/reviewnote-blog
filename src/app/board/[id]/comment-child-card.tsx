import { UserContext } from "@/context/user-context";
import commentRequest from "@/request/comment";
import { _CommentType } from "@/types/comment";
import { formatISO } from "@/utils";
import { RoundImage } from "@/components";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useContext, useState } from "react";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import ModifyCommentForm from "./modify-comment-form";

interface CommentChildCardProps {
  comment: _CommentType;
  callback?: () => void;
}

const CommentChildCard = ({ comment, callback }: CommentChildCardProps) => {
  const { user } = useContext(UserContext);
  const [isModify, setIsModify] = useState(false);
  const createdAt = formatISO(comment.createdAt);

  const isMyComment = user?.id === comment.user.id;
  const { toast } = useToast();

  return (
    <div className="flex gap-6 items-center p-4 border-b-2 border-stone-100 bg-slate-100 pl-12">
      <i>
        <MdSubdirectoryArrowRight />
      </i>
      <div className="flex gap-4 flex-1">
        <RoundImage imgSrc={comment.user.profile} size={54} alt="user_img" />

        <div className="flex flex-col gap-4 flex-1">
          <div className="flex gap-6 justify-between">
            <div className="flex gap-6 items-center">
              <span className="font-bold">{comment.user.nickname}</span>
              <span className="text-sm text-gray-400">{createdAt}</span>
            </div>

            {isMyComment && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsModify(!isModify)}
                  className="p-1"
                >
                  {isModify ? "수정취소" : "수정"}
                </Button>
                <Button
                  variant="outline"
                  className="p-1"
                  onClick={() =>
                    commentRequest
                      .deleteComment(String(comment.id))
                      .then(() =>
                        toast({
                          title: "댓글 삭제 성공",
                          description: "댓글이 성공적으로 삭제되었습니다.",
                          duration: 3000,
                        })
                      )
                      .then(callback)
                      .catch((err) => console.log(err))
                  }
                >
                  삭제
                </Button>
              </div>
            )}
          </div>
          {isModify ? (
            <ModifyCommentForm
              comment={comment}
              setIsModify={setIsModify}
              callback={callback}
            />
          ) : (
            <p>{comment.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentChildCard;
