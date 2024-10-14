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
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PostEidtorFormType } from "@/app/editor/editor-card";
import { PostResponseType } from "@/app/types";
import postRequest from "@/app/request/post";
import { toUrl } from "@/app/request/utils";
import { PageRoutes } from "@/app/constants/routes";
import QuillEditor from "@/app/editor/editor-quill";
import { FormErrorMessage } from "@/app/components";
import { BaseLayout } from "@/app/layouts";

interface EditorModifyCardProps {
  post: PostResponseType;
}

const defaultValues = {
  title: "",
  content: "",
};
const EditorModifyCard = ({ params }: { params: { id: number } }) => {
  const [post, setPost] = useState<PostResponseType | null>(null);
  const postId = params.id;

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    reset,
  } = useForm({
    defaultValues,
  });

  const router = useRouter();

  useEffect(() => {
    postRequest.getPost(String(postId)).then((res) => {
      setPost(res.post);
      reset({
        title: res.post.title,
        content: res.post.content,
      });
    });
  }, [postId, reset]);

  const onSubmit = useCallback((data: PostEidtorFormType) => {
    if (!data.content) {
      setError("content", {
        type: "manual",
        message: "내용을 입력해주세요.",
      });
      return;
    }

    postRequest
      .updatePost(String(postId), data)
      .then(() => {
        router.push(toUrl(PageRoutes.PostDetail, { id: String(postId) }));
      })
      .catch((err) => {
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
    <BaseLayout>
      <div className="flex flex-col items-center justify-center gap-2 my-24">
        <Card className="w-[800px] flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">게시글 수정</CardTitle>
            <CardDescription>기존 게시글을 수정하세요!</CardDescription>
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
                  defaultValue={post?.title}
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
                    defaultValue={post?.content}
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
    </BaseLayout>
  );
};

export default EditorModifyCard;
