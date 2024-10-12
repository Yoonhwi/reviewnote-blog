import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IconItemProps {
  icon: JSX.Element;
  tooltip: string;
}

const IconItem = ({ icon, tooltip }: IconItemProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <li className="list-none">
            <Button variant={"ghost"} className="p-2 m-0">
              {icon}
            </Button>
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
