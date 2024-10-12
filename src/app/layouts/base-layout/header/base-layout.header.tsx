"use client";
import { useCallback, useEffect, useState } from "react";
import LogoutStatusIcons from "./logout-status.icons";
import { cn } from "@/lib/utils";

const BaseLayoutHeader = () => {
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
        <h1>LOGO</h1>
        <nav>
          {/* <LoginStuatsIcons /> */}
          <LogoutStatusIcons />
        </nav>
      </div>
    </div>
  );
};

export default BaseLayoutHeader;
