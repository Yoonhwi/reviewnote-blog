"use client";

import { FormErrorMessage } from "@/app/components";
import { PageRoutes } from "@/app/constants/routes";
import userRequest from "@/app/request/user";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface LoginFormType {
  userId: string;
  password: string;
}

const defaultValues: LoginFormType = {
  userId: "",
  password: "",
};

const LoginCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormType>({ defaultValues });
  const router = useRouter();

  const onSubmit = (data: LoginFormType) => {
    userRequest
      .userLogin(data.userId, data.password)
      .then(() => {
        router.push(PageRoutes.Home);
      })
      .catch(() => {
        setError("password", {
          type: "manual",
          message: "아이디 또는 비밀번호가 일치하지 않습니다.",
        });
      });
  };

  return (
    <Card className="w-[480px] h-[420px] flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">로그인</CardTitle>
        <CardDescription>
          로그인 아이디와 비밀번호를 입력해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Label>아이디</Label>
            <Input
              id="userId"
              type="text"
              {...register("userId", {
                required: "아이디를 입력해주세요.",
              })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>비밀번호</Label>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
            />
          </div>
          {errors.password && (
            <FormErrorMessage err={errors.password.message!} />
          )}
          <Button type="submit" className="w-full">
            로그인
          </Button>
          <Link href={PageRoutes.Join} passHref>
            <Button type="submit" className="w-full">
              회원가입
            </Button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
