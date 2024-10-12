import { PostResponseType } from "@/app/types";
import { formatISO } from "@/app/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import DetailPostComments from "./detail-post.comments";
import { CommentResponseType } from "@/app/types/comment";

interface DetailPostCardProps {
  post: PostResponseType;
}
const DetailPostCard = ({ post }: DetailPostCardProps) => {
  const createdAt = formatISO(post.createdAt);
  return (
    <Card className="flex flex-col w-full h-full flex-grow mb-24 mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex gap-4 items-center">
          <span>{post.title}</span>
          <span className="text-sm text-gray-400">{createdAt}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-8 py-4 items-center lg:items-start">
          <div className="flex flex-col gap-4 w-1/5 items-center ">
            <Image
              width={120}
              height={120}
              alt="user_img"
              src={post.user.profile}
              className="rounded-full w-full"
            />
            <span>{post.user.nickname} 님의 게시글</span>
          </div>

          <div className="flex flex-col gap-4 w-4/5">
            <div className="p-2 border-b-2 border-stone-300">
              <p>{post.content}</p>
            </div>
            <DetailPostComments />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailPostCard;
