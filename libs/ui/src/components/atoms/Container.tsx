import React from "react";
import { Brand } from "../atoms/Brand";
import { ReactNode } from "react";
export interface IcontainerProps {
  children: ReactNode;
  className?: string;
}
export const Container = ({ children, className }: IcontainerProps) => {
  return (
    <div className={"container sm:px-2 mx-auto " + className}>{children}</div>
  );
};
