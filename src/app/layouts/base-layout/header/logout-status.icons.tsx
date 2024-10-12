import { IoIosList } from "react-icons/io";
import { PiSignIn } from "react-icons/pi";
import IconItem from "./icon-item";

const LogoutStatusIcons = () => {
  return (
    <ul className={"flex gap-4"}>
      <IconItem icon={<IoIosList className="w-6 h-6" />} tooltip="Board" />
      <IconItem icon={<PiSignIn className="w-6 h-6" />} tooltip="Login" />
    </ul>
  );
};

export default LogoutStatusIcons;
