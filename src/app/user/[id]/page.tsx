"use client";

import { BaseLayout } from "@/app/layouts";
import UserCard from "./user-card";
import userRequest from "@/app/request/user";
import { UserResponseType } from "@/app/types";
import { useEffect, useState } from "react";
import { Spinner } from "@/app/components";

const DetailUserPage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<UserResponseType | null>(null);
  const { id } = params;

  useEffect(() => {
    userRequest.getUser(id).then((data) => {
      setUser(data.user);
    });
  }, [id]);

  return (
    <BaseLayout>
      <div className="flex flex-col justify-center items-center gap-2 min-h-[800px] mb-24 mt-8">
        {user ? <UserCard user={user} /> : <Spinner />}
      </div>
    </BaseLayout>
  );
};

export default DetailUserPage;
