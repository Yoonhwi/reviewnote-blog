import { GoPerson } from "react-icons/go";
import { IoIosList } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import IconItem from "./icon-item";
import { PageRoutes } from "@/constants/routes";
import { UserResponseType } from "@/types";
import userRequest from "@/request/user";
import { toUrl } from "@/request/utils";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/context/user-context";

const LoginStuatsIcons = ({ user }: { user: UserResponseType }) => {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  return (
    <ul className={"flex gap-4"}>
      <IconItem
        icon={<IoIosList className="w-6 h-6" />}
        tooltip="Board"
        link={PageRoutes.Board}
      />
      <IconItem
        icon={<GoPerson className="w-6 h-6" />}
        tooltip="MyPage"
        link={toUrl(PageRoutes.UserDetail, { id: String(user.id) })}
      />
      <IconItem
        icon={<IoLogOutOutline className="w-6 h-6" />}
        tooltip="Logout"
        link={"/"}
        onClick={() =>
          userRequest
            .userLogout()
            .then(() => {
              setUser(null);
            })
            .then(() => {
              router.push(PageRoutes.Home, { scroll: false });
            })
        }
      />
    </ul>
  );
};

export default LoginStuatsIcons;
