import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";
}
export const Badge = ({
  children,
  size = "md",
  variant = "gray",
}: BadgeProps) => {
  const sizeCls = {
    sm: "text-sm px-2 font-normal",
    md: "text-sm px-2 py-1.5 font-normal",
    lg: "px-3 py-1.5 font-normal",
  };
  const variantCls = {
    primary: "bg-primary-100 border border-white text-primary-900",
    gray: "bg-gray-100 border border-white text-gray-900",
    red: "bg-red-100 border border-white text-red-900",
    yellow: "bg-yellow-100 border border-white text-yellow-900",
    green: "bg-green-100 border border-white text-green-900",
    blue: "bg-blue-100 border border-white text-blue-900",
    indigo: "bg-indigo-100 border border-white text-indigo-900",
    purple: "bg-purple-100 border border-white text-purple-900",
    pink: "bg-pink-100 border border-white text-pink-900",
  };
  return (
    <span
      className={`ml-2 ${sizeCls[size]} transition-all py-1 px-2 items-center shadow justify-center duration-300 rounded-full ${variantCls[variant]}`}
    >
      {children}
    </span>
  );
};
