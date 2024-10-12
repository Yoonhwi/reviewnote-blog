import { BaseLayout } from "@/app/layouts";
import LoginCard from "./login-card";

const LoginPage = () => {
  return (
    <BaseLayout>
      <div className="h-[800px] flex justify-center items-center">
        <LoginCard />
      </div>
    </BaseLayout>
  );
};

export default LoginPage;
