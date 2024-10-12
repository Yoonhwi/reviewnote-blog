import { PageRoutes } from "@/app/constants/routes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const LoginCard = () => {
  return (
    <Card className="w-[480px] h-[520px] flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input id="userId" type="text" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label>password</Label>
            <Input id="userId" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Link href={PageRoutes.Join} passHref>
            <Button type="button" className="w-full">
              Sign Up
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
