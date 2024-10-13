"use client";

import { useCallback, useEffect, useState } from "react";
import LogoutStatusIcons from "./logout-status.icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PageRoutes } from "@/app/constants/routes";
import userRequest from "@/app/request/user";
import LoginStuatsIcons from "./login-status.icons";

const BaseLayoutHeader = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isTop, setIsTop] = useState(false);

  const scrollListener = useCallback(() => {
    setIsTop(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => scrollListener());
    return () => {
      window.removeEventListener("scroll", () => scrollListener());
    };
  }, [scrollListener]);

  useEffect(() => {
    userRequest.getMe().then((res: any) => {
      if (res.data) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 z-10 w-full flex justify-center items-center h-16",
        {
          "shadow-md opacity-90": isTop,
        }
      )}
    >
      <div className="w-[1280px] flex justify-between items-center">
        <Link href={PageRoutes.Home}>
          <h1>LOGO</h1>
        </Link>
        <nav>{isLogin ? <LoginStuatsIcons /> : <LogoutStatusIcons />}</nav>
      </div>
    </div>
  );
};

export default BaseLayoutHeader;
