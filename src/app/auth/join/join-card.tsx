"use client";

import { FormErrorMessage } from "@/components";
import { PageRoutes } from "@/constants/routes";
import { UserContext } from "@/context/user-context";
import userRequest from "@/request/user";
import { PostUser } from "@/types";
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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";

interface AddUserFormType extends PostUser {
  passwordCheck: string;
}

const defaultUserValues: AddUserFormType = {
  userId: "",
  nickname: "",
  password: "",
  passwordCheck: "",
  role: "user",
  profile: process.env.NEXT_PUBLIC_NONE_USER!,
};

const JoinCard = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
  } = useForm<AddUserFormType>({
    mode: "onSubmit",
    defaultValues: defaultUserValues,
  });
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const { toast } = useToast();

  const onSubmit = async (data: AddUserFormType) => {
    const submitData: PostUser = {
      userId: data.userId,
      nickname: data.nickname,
      password: data.password,
      role: "user",
      profile: data.profile,
    };

    try {
      await userRequest.checkIdExist(submitData.userId);
    } catch {
      setError("userId", {
        type: "manual",
        message: "이미 존재하는 아이디입니다.",
      });
      return;
    }

    try {
      await userRequest.checkNicknameExist(submitData.nickname);
    } catch {
      setError("nickname", {
        type: "manual",
        message: "이미 존재하는 닉네임입니다.",
      });
      return;
    }

    try {
      await userRequest.addUser(submitData);
      await userRequest
        .userLogin(submitData.userId, submitData.password)
        .then((res) => {
          toast({
            title: "회원가입 성공",
            description: "정상적으로 회원가입 되었습니다.",
            duration: 3000,
          });
          return res;
        })
        .then((res) => {
          setUser(res.data);
        })
        .then(() => {
          router.push(PageRoutes.Home, { scroll: false });
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-[680px] flex justify-center items-center">
      <Card className="w-[480px] h-[520px] flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
          <CardDescription>
            계정을 만들어 블로그를 시작해보세요!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <Label>아이디</Label>
              <Input
                id="userId"
                type="text"
                placeholder="아이디를 입력하세요."
                {...register("userId", {
                  required: "아이디를 입력해주세요.",
                  minLength: {
                    value: 4,
                    message: "아이디는 4글자 이상이어야 합니다.",
                  },
                  maxLength: {
                    value: 20,
                    message: "아이디는 12글자 이하여야 합니다.",
                  },
                })}
              />
              {errors.userId && (
                <FormErrorMessage err={errors.userId.message!} />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>닉네임</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="닉네임"
                {...register("nickname", {
                  required: "닉네임을 입력해주세요.",
                  minLength: {
                    value: 2,
                    message: "닉네임은 2글자 이상이어야 합니다.",
                  },
                  maxLength: {
                    value: 8,
                    message: "닉네임은 8글자 이하여야 합니다.",
                  },
                })}
              />
              {errors.nickname && (
                <FormErrorMessage err={errors.nickname.message!} />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>비밀번호</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 4,
                    message: "비밀번호는 4글자 이상이어야 합니다.",
                  },
                  maxLength: {
                    value: 20,
                    message: "비밀번호는 20글자 이하여야 합니다.",
                  },
                })}
              />
              {errors.password && (
                <FormErrorMessage err={errors.password.message!} />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>비밀번호 확인</Label>
              <Input
                id="password2"
                type="password"
                {...register("passwordCheck", {
                  required: "비밀번호를 다시 입력해주세요.",
                  validate: (value) =>
                    value === getValues("password") ||
                    "비밀번호가 일치하지 않습니다.",
                })}
              />
              {errors.passwordCheck && (
                <FormErrorMessage err={errors.passwordCheck.message!} />
              )}
            </div>

            <Button type="submit" className="w-full">
              가입하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinCard;
