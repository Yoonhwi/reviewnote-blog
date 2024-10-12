import EditorCard from "@/app/editor/editor-card";
import { BaseLayout } from "@/app/layouts";

const PostPage = () => {
  return (
    <BaseLayout>
      <div className="h-[680px] flex flex-col items-center justify-center gap-2 my-24">
        <EditorCard />
      </div>
    </BaseLayout>
  );
};

export default PostPage;
