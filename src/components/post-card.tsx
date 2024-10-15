import { PostResponseType } from "@/app/types";
import Image from "next/image";
import { formatISO } from "../app/utils/date";
import { useRouter } from "next/navigation";
import { toUrl } from "../app/request/utils";
import { PageRoutes } from "../app/constants/routes";
import { RoundImage } from "@/components";

interface PostCardProps {
  post: PostResponseType;
}

const PostCard = ({ post }: PostCardProps) => {
  const router = useRouter();
  const createdAt = formatISO(post.createdAt);

  return (
    <div
      className="flex flex-col shadow-sm bg-white hover:shadow-xl transition duration-300 ease-in-out cursor-pointer"
      onClick={() => {
        router.push(toUrl(PageRoutes.PostDetail, { id: String(post.id) }), {
          scroll: false,
        });
      }}
    >
      <Image
        src={post.mainImg}
        alt={`post_img`}
        width={300}
        height={200}
        className="w-full h-80 object-cover"
        priority
      />

      <div className="flex gap-2 items-center p-2">
        <RoundImage size={60} alt="user_img" imgSrc={post.user.profile} />
        <div className="flex flex-col gap-2">
          <span>{post.user.nickname}</span>
          <span>{createdAt}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 overflow-hidden">
        <h1 className="font-bold overflow-hidden">{post.title}</h1>
      </div>
    </div>
  );
};

export default PostCard;
