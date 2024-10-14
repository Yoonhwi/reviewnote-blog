import { PageRoutes } from "@/app/constants/routes";
import { toUrl } from "@/app/request/utils";
import { PostResponseType } from "@/app/types";
import { truncateText, formatISO } from "@/app/utils";
import { useRouter } from "next/navigation";

interface TextPostCardProps {
  post: PostResponseType;
}
const TextPostCard = ({ post }: TextPostCardProps) => {
  const createdAt = formatISO(post.createdAt);
  const router = useRouter();

  return (
    <div
      className="flex flex-col border-b-2 border-stone-300 p-2 gap-4 hover:shadow-sm transition duration-300 ease-in-out transform  cursor-pointer"
      onClick={() => {
        router.push(toUrl(PageRoutes.PostDetail, { id: String(post.id) }), {
          scroll: false,
        });
      }}
    >
      <div className="flex gap-4 items-center">
        <span>{post.title}</span>
        <span className="text-xs opacity-80">{createdAt}</span>
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: truncateText(post.content, 80) }}
        className="max-h-[80px] overflow-hidden"
      />
    </div>
  );
};

export default TextPostCard;
