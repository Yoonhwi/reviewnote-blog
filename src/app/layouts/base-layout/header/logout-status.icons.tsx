import { IoIosList } from "react-icons/io";
import { PiSignIn } from "react-icons/pi";
import IconItem from "./icon-item";
import { PageRoutes } from "@/constants/routes";

const LogoutStatusIcons = () => {
  return (
    <ul className={"flex gap-4"}>
      <IconItem
        icon={<IoIosList className="w-6 h-6" />}
        tooltip="Board"
        link={PageRoutes.Board}
      />
      <IconItem
        icon={<PiSignIn className="w-6 h-6" />}
        tooltip="Login"
        link={PageRoutes.Login}
      />
    </ul>
  );
};

export default LogoutStatusIcons;
