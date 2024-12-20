import { UserContext } from "@/context/user-context";
import { addImage } from "@/request/storage";
import userRequest from "@/request/user";
import { UserResponseType } from "@/types";
import { RoundImage } from "@/components";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
        <div className="flex flex-col gap-4 items-center">
          <div className="p-4">
            <RoundImage size={160} alt="user_img" imgSrc={img} />
          </div>
          {isMyPage && (
            <div className="flex flex-col gap-2 w-1/2">
              <Label
                className="cursor-pointer px-4 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-500 flex justify-center items-center h-[36px]"
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
