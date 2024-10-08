"use client";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

const Button = ({ className, variant = "outline", ...rest }: ButtonProps) => {
  return (
    <button className={twMerge(getBgColor(variant), className)} {...rest} />
  );
};

export default Button;

const getBgColor = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "primary":
      return "bg-red-100";
    case "outline":
      return "bg-blue-50";
  }
};
