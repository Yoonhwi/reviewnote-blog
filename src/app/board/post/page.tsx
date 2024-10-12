import Editor from "@/app/editor/editor";
import { BaseLayout } from "@/app/layouts";

const PostPage = () => {
  return (
    <BaseLayout>
      <div>editor</div>
      <div>
        <Editor />
      </div>
    </BaseLayout>
  );
};

export default PostPage;
