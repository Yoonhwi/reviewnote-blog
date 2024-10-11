import { cookies } from "next/headers";

interface BaseLayoutHeaderProps {}

const BaseLayoutHeader = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access-token");

  return (
    <div className={"flex flex-col"}>
      <h1>header</h1>
      <div>
        {accessToken?.value ? `안녕하세요 ${accessToken?.value}님` : "logout"}
      </div>
    </div>
  );
};

export default BaseLayoutHeader;
