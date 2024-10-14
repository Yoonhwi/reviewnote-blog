"use client";

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
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormErrorMessage } from "../components";
import { PageRoutes } from "../constants/routes";
import postRequest from "../request/post";
import { toUrl } from "../request/utils";
import QuillEditor from "./editor-quill";
import { useToast } from "@/hooks/use-toast";

export interface PostEidtorFormType {
  title: string;
  content: string;
}

const defaultValues: PostEidtorFormType = {
  title: "",
  content: "",
};

const EditorCard = () => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({ defaultValues });

  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = useCallback((data: PostEidtorFormType) => {
    console.log("hit1");

    if (!data.content) {
      setError("content", {
        type: "manual",
        message: "내용을 입력해주세요.",
      });
      return;
    }

    postRequest
      .addPost(data)
      .then((res) => {
        toast({
          title: "게시글 작성 성공",
          description: "게시글이 성공적으로 작성되었습니다.",
          duration: 3000,
        });
        return res;
      })
      .then((res) => {
        const postId = res.post.id;
        router.push(toUrl(PageRoutes.PostDetail, { id: String(postId) }), {
          scroll: false,
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "게시글 작성 실패",
          description: "게시글 작성에 실패했습니다.",
          duration: 3000,
        });
        setError("content", {
          type: "manual",
          message: "게시글 작성에 실패했습니다.",
        });
      });
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 my-24">
      <Card className="w-[800px] flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">게시글 작성</CardTitle>
          <CardDescription>이야기를 공유해보세요!</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="제목을 입력하세요."
                {...register("title", {
                  required: "제목을 입력해주세요.",
                  minLength: {
                    value: 4,
                    message: "제목은 4글자 이상이어야 합니다.",
                  },
                  maxLength: {
                    value: 20,
                    message: "제목은 20글자 이하여야 합니다.",
                  },
                })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              {mounted && (
                <QuillEditor
                  onChange={(value) => {
                    setValue("content", value);
                    clearErrors("content");
                  }}
                />
              )}
            </div>
            {errors.title && <FormErrorMessage err={errors.title.message!} />}
            {errors.content && (
              <FormErrorMessage err={errors.content.message!} />
            )}
            <div className="flex justify-end">
              <Button type="submit" variant={"outline"}>
                POST
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditorCard;
