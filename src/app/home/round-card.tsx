import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const RoundCard = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <div className="w-40 h-40 rounded-full bg-white shadow-xl border-solid border-stone-200 border-2 flex items-center justify-center"></div>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={20}>
          Tooltip content
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RoundCard;
