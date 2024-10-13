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
    <Card className="w-[480px] h-[420px] flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">로그인</CardTitle>
        <CardDescription>
          로그인 아이디와 비밀번호를 입력해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>아이디</Label>
            <Input id="userId" type="text" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label>비밀번호</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            로그인
          </Button>
          <Link href={PageRoutes.Join} passHref>
            <Button type="button" className="w-full">
              회원가입
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
