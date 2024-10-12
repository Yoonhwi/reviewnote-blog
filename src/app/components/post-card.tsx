import { PostResponseType } from "@/app/types";
import Image from "next/image";
import { formatISO } from "../utils/date";
import { truncateText } from "../utils/text";
interface PostCardProps {
  post: PostResponseType;
}
const PostCard = ({ post }: PostCardProps) => {
  const createdAt = formatISO(post.createdAt);

  return (
    <div className="flex flex-col shadow-lg bg-white">
      <Image
        src={post.mainImage}
        alt={`post_img`}
        width={300}
        height={200}
        className="w-full h-80 object-cover"
      />

      <div className="flex gap-2 items-center p-2">
        <Image
          src={post.user.profile}
          alt="user_img"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2">
          <span>{post.user.nickname}</span>
          <span>{createdAt}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 overflow-hidden">
        <h1 className="font-bold">{post.title}</h1>
        <p className="text-sm h-14 overflow-hidden">
          {truncateText(post.content, 80)}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
