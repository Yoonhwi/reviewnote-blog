import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const JoinCard = () => {
  return (
    <Card className="w-[480px] h-[520px] flex flex-col justify-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>Create an account to get started!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input id="userId" type="text" required />
          </div>

          <div className="flex flex-col gap-2">
            <Label>nickname</Label>
            <Input id="nickname" type="text" required />
          </div>

          <div className="flex flex-col gap-2">
            <Label>password</Label>
            <Input id="password" type="password" required />
          </div>

          <div className="flex flex-col gap-2">
            <Label>password</Label>
            <Input id="password2" type="password" required />
          </div>

          <Button type="button" className="w-full">
            Sign Up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinCard;
