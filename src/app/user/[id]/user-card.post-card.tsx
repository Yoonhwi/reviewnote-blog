import { PostResponseType } from "@/app/types";
import { formatISO } from "@/app/utils/date";
import { truncateText } from "@/app/utils/text";

interface TextPostCardProps {
  post: PostResponseType;
}
const TextPostCard = ({ post }: TextPostCardProps) => {
  const createdAt = formatISO(post.createdAt);

  return (
    <div className="flex flex-col border-b-2 border-stone-300 p-2 gap-4">
      <div className="flex gap-4 items-center">
        <span>{post.title}</span>
        <span className="text-xs opacity-80">{createdAt}</span>
      </div>
      <p className="text-sm">{truncateText(post.content, 80)}</p>
    </div>
  );
};

export default TextPostCard;
