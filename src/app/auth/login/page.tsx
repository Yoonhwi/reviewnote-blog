import { PageRoutes } from "@/app/constants/routes";
import Link from "next/link";

const Login = () => {
  return (
    <div>
      <Link href={PageRoutes.Join}>Join</Link>
    </div>
  );
};

export default Login;
