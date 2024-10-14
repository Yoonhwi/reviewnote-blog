import { _CommentType } from "@/app/types/comment";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import Image from "next/image";
import { formatISO } from "@/app/utils";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import ModifyCommentForm from "./modify-comment-form";
import { UserContext } from "@/app/context/user-context";
import commentRequest from "@/app/request/comment";

interface CommentChildCardProps {
  comment: _CommentType;
}

const CommentChildCard = ({ comment }: CommentChildCardProps) => {
  const { user } = useContext(UserContext);
  const [isModify, setIsModify] = useState(false);
  const createdAt = formatISO(comment.createdAt);

  const isMyComment = user?.id === comment.user.id;

  return (
    <div className="flex gap-6 items-center p-4 border-b-2 border-stone-100 bg-slate-100 pl-12">
      <i>
        <MdSubdirectoryArrowRight />
      </i>
      <div className="flex gap-4 flex-1">
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

            {isMyComment && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsModify(!isModify)}
                >
                  {isModify ? "수정취소" : "수정"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    commentRequest.deleteComment(String(comment.id));
                  }}
                >
                  삭제
                </Button>
              </div>
            )}
          </div>
          {isModify ? (
            <ModifyCommentForm comment={comment} />
          ) : (
            <p>{comment.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentChildCard;
