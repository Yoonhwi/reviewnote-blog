import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Editor from "./editor";
import { Button } from "@/components/ui/button";

const EditorCard = () => {
  return (
    <Card className="w-[800px] flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Write a Post</CardTitle>
        <CardDescription>Start sharing your story!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input
              id="title"
              type="text"
              required
              placeholder="제목을 입력하세요."
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Content</Label>
            <Editor />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant={"outline"}>
              POST
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditorCard;
