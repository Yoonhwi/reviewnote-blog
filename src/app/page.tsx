import { PostCard } from "@/app/components";
import { dummyPosts } from "./dummy/post";
import { BaseLayout } from "./layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  return (
    <BaseLayout>
      <div className="flex flex-col gap-2 items-center">
        <div className="p-6 flex flex-col gap-6 items-center justify-center">
          <h1 className="text-3xl font-bold">Welcome to Blog</h1>

          <div className="flex w-full max-w-sm items-center gap-2">
            <Input type="search" placeholder="Seach" className="w-[280px]" />
            <Button type="submit" className="p-3">
              <FaSearch />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-y-6 gap-x-4">
          {dummyPosts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Home;
