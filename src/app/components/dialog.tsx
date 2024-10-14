import {
  Dialog as _Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface DialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
}

const Dialog = ({ trigger, title, description, content }: DialogProps) => {
  return (
    <_Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center">{content}</div>
      </DialogContent>
    </_Dialog>
  );
};

export default Dialog;
