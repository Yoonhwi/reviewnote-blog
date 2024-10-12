import { dummyPosts } from "@/app/dummy/post";
import { BaseLayout } from "@/app/layouts";
import DetailPostCard from "./detail-post-card";

const DetailPostPage = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const testData = dummyPosts[0];
  //여기서 id를 이용해서 게시글 정보를 가져와야 합니다.

  return (
    <BaseLayout>
      <div className="flex flex-col justify-center items-center gap-2 min-h-[800px]">
        <DetailPostCard post={testData} />
      </div>
    </BaseLayout>
  );
};

export default DetailPostPage;
