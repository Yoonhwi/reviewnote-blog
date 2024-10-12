import { Post } from "@/app/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
interface PostCardProps {
  post: Post;
}
const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className={cn("flex flex-col shadow-lg bg-white")}>
      <Image src={post.mainImage} alt={`post_img`} width={300} height={200} />
      <div className="flex flex-col gap-2 p-2">
        <span>{post.title}</span>
        <div>{post.content}</div>
      </div>
    </div>
  );
};

export default PostCard;
