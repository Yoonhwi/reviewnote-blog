"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, MouseEvent } from "react";

interface IconItemProps {
  icon: JSX.Element;
  tooltip: string;
  link: string;
  onClick?: ButtonProps["onClick"];
}

const IconItem = ({ icon, tooltip, link, onClick }: IconItemProps) => {
  const router = useRouter();
  const handleClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (onClick) {
        await onClick(e);
        return;
      }
      router.push(link);
    },
    [onClick, router, link]
  );

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <li className="list-none">
            <Button variant={"ghost"} className="p-2 m-0" onClick={handleClick}>
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
