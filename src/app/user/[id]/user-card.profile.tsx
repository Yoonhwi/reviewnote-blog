import { UserContext } from "@/app/context/user-context";
import { addImage } from "@/app/request/storage";
import userRequest from "@/app/request/user";
import { UserResponseType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useContext, useState } from "react";

interface UserCardProfileProps {
  user: UserResponseType;
}
const UserCardProfile = ({ user }: UserCardProfileProps) => {
  const [img, setImg] = useState(user.profile);
  const { user: loginUser } = useContext(UserContext);
  const { toast } = useToast();
  const isMyPage = loginUser?.id === user.id;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      addImage(formData).then((res) => {
        setImg(res.data);
      });
    } catch (err) {
      console.log("upload err", err);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-1/4">
      <div className="flex flex-col gap-2">
        <Label>프로필 이미지</Label>
        {isMyPage && <CardDescription>이미지를 변경해보세요!</CardDescription>}
        <div className="flex flex-col gap-4">
          <div className="p-4">
            <Image
              width={120}
              height={120}
              alt="user_img"
              src={img}
              className="rounded-full w-full h-full object-cover"
              priority
            />
          </div>
          {isMyPage && (
            <div className="flex flex-col gap-2">
              <Label
                className="cursor-pointer px-4 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-600 flex justify-center items-center"
                htmlFor="file-upload"
              >
                프로필 변경
              </Label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e)}
              />
              <Button
                onClick={() => {
                  userRequest
                    .updateUser(String(user.id), { profile: img })
                    .then(() =>
                      toast({
                        title: "이미지 변경 성공",
                        description: `프로필 이미지가 성공적으로 변경되었습니다.`,
                        duration: 3000,
                      })
                    );
                }}
              >
                변경 완료
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCardProfile;
