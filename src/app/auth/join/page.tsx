import { BaseLayout } from "@/app/layouts";
import JoinCard from "./join-card";

const JoinPage = () => {
  return (
    <BaseLayout>
      <div className="h-[680px] flex justify-center items-center">
        <JoinCard />
      </div>
    </BaseLayout>
  );
};

export default JoinPage;
