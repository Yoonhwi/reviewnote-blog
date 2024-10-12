import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface IconItemProps {
  icon: JSX.Element;
  tooltip: string;
  link: string;
}

const IconItem = ({ icon, tooltip, link }: IconItemProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <li className="list-none">
            <Link href={link} passHref>
              <Button variant={"ghost"} className="p-2 m-0">
                {icon}
              </Button>
            </Link>
          </li>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={8}
          className="p-[5px] text-xs"
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default IconItem;
