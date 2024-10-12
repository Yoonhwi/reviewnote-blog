import { BaseLayout } from "@/app/layouts";
import LoginCard from "./login-card";

const Login = () => {
  return (
    <BaseLayout>
      <div className="h-[800px] flex justify-center items-center">
        <LoginCard />
      </div>
    </BaseLayout>
  );
};

export default Login;
