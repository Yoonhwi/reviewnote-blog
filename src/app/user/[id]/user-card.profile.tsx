import { Label } from "@/components/ui/label";
import { UserCardProps } from "./user-card";
import Image from "next/image";
import { CardDescription } from "@/components/ui/card";

const UserCardProfile = ({ user }: UserCardProps) => {
  return (
    <div className="flex flex-col gap-8 w-1/4">
      <div className="flex flex-col gap-2">
        <Label>프로필 이미지</Label>
        <CardDescription>이미지를 변경해보세요!</CardDescription>
        <div className="flex flex-col gap-4">
          <div className="p-4">
            <Image
              width={120}
              height={120}
              alt="user_img"
              src={user.profile}
              className="rounded-full w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              className="cursor-pointer px-4 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-600 flex justify-center items-center"
              htmlFor="file-upload"
            >
              파일 업로드
            </Label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => {
                console.log(e.target.files?.[0]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardProfile;
