import { GoPerson } from "react-icons/go";
import { IoIosList } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import IconItem from "./icon-item";

const LoginStuatsIcons = () => {
  return (
    <ul className={"flex gap-4"}>
      <IconItem icon={<IoIosList className="w-6 h-6" />} tooltip="Board" />
      <IconItem icon={<GoPerson className="w-6 h-6" />} tooltip="MyPage" />
      <IconItem
        icon={<IoLogOutOutline className="w-6 h-6" />}
        tooltip="Logout"
      />
    </ul>
  );
};

export default LoginStuatsIcons;
