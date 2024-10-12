import { PostCard, SearchPost, Pagination } from "@/app/components";
import { BaseLayout } from "../layouts";
import { Button } from "@/components/ui/button";
import { dummyPosts } from "../dummy/post";
import Link from "next/link";
import { PageRoutes } from "../constants/routes";

const BoardPage = () => {
  return (
    <BaseLayout>
      <div className="flex flex-col gap-4 py-16">
        <div className="flex justify-between items-center">
          <Link href={PageRoutes.Post} passHref>
            <Button>글 작성</Button>
          </Link>
          <div className="flex justify-end">
            <SearchPost />
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-y-6 gap-x-4">
          {dummyPosts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })}
        </div>

        <div className="flex items-center h-32">
          <Pagination />
        </div>
      </div>
    </BaseLayout>
  );
};

export default BoardPage;
