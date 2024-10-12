import { BaseLayout } from "@/app/layouts";
import { UserResponseType } from "@/app/types";
import UserCard from "./user-card";

const dummyUser: UserResponseType = {
  id: 1,
  userId: "test",
  profile: process.env.NEXT_PUBLIC_NONE_USER!,
  role: "user",
  nickname: "test",
  createdAt: String(new Date()),
};

const DetailUserPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <BaseLayout>
      <div className="flex flex-col justify-center items-center gap-2 min-h-[800px] mb-24 mt-8">
        <UserCard user={dummyUser} />
      </div>
    </BaseLayout>
  );
};

export default DetailUserPage;
