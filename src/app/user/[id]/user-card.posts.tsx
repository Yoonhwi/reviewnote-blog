import { Label } from "@/components/ui/label";
import { UserCardProps } from "./user-card";
import { CardDescription } from "@/components/ui/card";
import { PostResponseType } from "@/app/types";
import TextPostCard from "./user-card.post-card";

const UserCardPosts = ({ user }: UserCardProps) => {
  //여기서 해당 유저의 id로 게시글을 fetch
  const dummyPosts: PostResponseType[] = [
    {
      id: 1,
      title: "제목테스트 중입니다.",
      content: "content",
      mainImage: "mainImage",
      createdAt: String(new Date()),
      userId: "test",
      user,
    },
    {
      id: 1,
      title: "title",
      content: "content",
      mainImage: "mainImage",
      createdAt: String(new Date()),
      userId: "test",
      user,
    },
    {
      id: 1,
      title: "title",
      content: "content",
      mainImage: "mainImage",
      createdAt: String(new Date()),
      userId: "test",
      user,
    },
    {
      id: 1,
      title: "title",
      content: "content",
      mainImage: "mainImage",
      createdAt: String(new Date()),
      userId: "test",
      user,
    },
    {
      id: 1,
      title: "title",
      content: "content",
      mainImage: "mainImage",
      createdAt: String(new Date()),
      userId: "test",
      user,
    },
    {
      id: 1,
      title: "title",
      content: "content",
      mainImage: "mainImage",
      createdAt: String(new Date()),
      userId: "test",
      user,
    },
    {
      id: 1,
      title: "title",
      content: "content",
      mainImage: "mainImage",
      createdAt: String(new Date()),
      userId: "test",
      user,
    },
    {
      id: 1,
      title: "title",
      content: "content",
      mainImage: "mainImage",
      createdAt: String(new Date()),
      userId: "test",
      user,
    },
    {
      id: 1,
      title: "title",
      content:
        "컨텐츠 길이별 테스트중입니다. 컨텐츠 길이별 테스트중입니다.컨텐츠 길이별 테스트중입니다.컨텐츠 길이별 테스트중입니다.컨텐츠 길이별 테스트중입니다.컨텐츠 길이별 테스트중입니다.컨텐츠 길이별 테스트중입니다.컨텐츠 길이별 테스트중입니다.컨텐츠 길이별 테스트중입니다.컨텐츠 길이별 테스트중입니다.컨텐츠 길이별 테스트중입니다.컨텐츠 길이별 테스트중입니다.컨텐츠 길이별 테스트중입니다.컨텐츠 길이별 테스트중입니다.",
      mainImage: "mainImage",
      createdAt: String(new Date()),
      userId: "test",
      user,
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-3/4">
      <Label>내 게시글</Label>
      <CardDescription>내 게시글을 모아볼 수 있어요!</CardDescription>
      <div className="flex flex-col gap-2 pb-4">
        {dummyPosts.map((post) => {
          return <TextPostCard post={post} key={post.id} />;
        })}
      </div>
    </div>
  );
};

export default UserCardPosts;
