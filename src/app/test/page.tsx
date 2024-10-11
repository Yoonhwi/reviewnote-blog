import BaseLayout from "../layouts/base-layout";
import ApiAuth from "./api-auth";
import ApiComment from "./api-comment";
import ApiPost from "./api-post";
import ApiStorage from "./api-storage";
import ApiUser from "./api-user";

const Test = () => {
  return (
    <BaseLayout>
      <div className="flex flex-col gap-8">
        <ApiUser />
        <ApiPost />
        <ApiComment />
        <ApiStorage />
        <ApiAuth />
      </div>
    </BaseLayout>
  );
};

export default Test;
