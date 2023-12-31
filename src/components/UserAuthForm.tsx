"use client";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { signIn } from "next-auth/react";
import { Icons } from "./Icon";
import { useToast } from "@/hooks/use-toast";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      // throw new Error();
      await signIn("google");
    } catch (err) {
      //Notification
      toast({
        title: "Error",
        description: "There was an error with logIn google",
        variant: "destructive",
      });
      console.log("error", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size={"sm"}
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
