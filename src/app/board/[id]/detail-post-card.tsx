import { PageRoutes } from "@/constants/routes";
import { UserContext } from "@/context/user-context";
import postRequest from "@/request/post";
import { toUrl } from "@/request/utils";
import { PostResponseType } from "@/types";
import { formatISO } from "@/utils";
import { RoundImage } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import DetailPostComments from "./detail-post.comments";

interface DetailPostCardProps {
  post: PostResponseType;
}

const DetailPostCard = ({ post }: DetailPostCardProps) => {
  const { user } = useContext(UserContext);
  const createdAt = formatISO(post.createdAt);
  const router = useRouter();
  const isMyPost = user?.id === post.user.id || user?.role === "admin";

  return (
    <Card className="flex flex-col w-full h-full flex-grow mb-24 mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex justify-between  items-center">
            <div className="flex gap-4 items-center">
              <span>{post.title}</span>
              <span className="text-sm text-gray-400">{createdAt}</span>
            </div>
            {isMyPost && (
              <div className="flex gap-2">
                <Button
                  className="p-1"
                  variant={"outline"}
                  onClick={() => {
                    router.push(
                      toUrl(PageRoutes.PostModify, { id: String(post.id) }),
                      { scroll: false }
                    );
                  }}
                >
                  수정
                </Button>
                <Button
                  className="p-1"
                  variant={"outline"}
                  onClick={() =>
                    postRequest
                      .deletePost(String(post.id))
                      .then(() => {
                        router.push(PageRoutes.Board, { scroll: false });
                      })
                      .catch((err) => console.log(err))
                  }
                >
                  삭제
                </Button>
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-8 py-4 items-center lg:items-start">
          <div className="flex flex-col gap-4 w-1/5 items-center">
            <RoundImage
              size={120}
              alt="user_img"
              imgSrc={post.user.profile}
              onClick={() => {
                router.push(
                  toUrl(PageRoutes.UserDetail, { id: String(post.user.id) }),
                  { scroll: false }
                );
              }}
              className="hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            />
            <span>{post.user.nickname} 님의 게시글</span>
          </div>

          <div className="flex flex-col gap-4 w-4/5">
            <div className="px-2 py-10 border-b-2 border-stone-300">
              <p dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            <DetailPostComments postId={post.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailPostCard;
