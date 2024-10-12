import { CommentResponseType } from "@/app/types/comment";
import { formatISO } from "@/app/utils";
import Image from "next/image";

interface CommentCardProps {
  comment: CommentResponseType;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const createdAt = formatISO(comment.createdAt);
  return (
    <div className="flex gap-4 p-4 border-b-2 border-stone-100">
      <Image
        src={comment.user.profile}
        width={54}
        height={54}
        alt="user_img"
        className="rounded-full w-[54px] h-[54px]"
      />

      <div className="flex flex-col gap-4">
        <div className="flex gap-6 items-center">
          <span className="font-bold">{comment.user.nickname}</span>
          <span className="text-sm text-gray-400">{createdAt}</span>
        </div>
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
