import React from "react";
import { ReactNode } from "react";

export type MapPanelTypes = {
  children: ReactNode;
  className?: string;
  position?:
    | "left-top"
    | "left-bottom"
    | "left-center"
    | "right-top"
    | "right-center"
    | "right-bottom"
    | "center-top"
    | "center-center"
    | "center-bottom";
};

export const Panel = ({ children, className, position }: MapPanelTypes) => {
  const classes = {
    "left-top": "left-0 top-0 flex flex-col items-start",
    "left-bottom": "left-0 bottom-0 flex flex-col items-start",
    "left-center": "left-0 top-1/2 flex flex-col items-start -translate-y-1/2",
    "right-top": "right-0 top-0 flex flex-col items-end text-right",
    "right-bottom": "right-0 bottom-0 flex flex-col items-end text-right",
    "right-center":
      "right-0 top-1/2 -translate-y-1/2 flex flex-col items-end text-right",
    "center-top":
      "left-1/2 top-0 -translate-x-1/2 items-center text-center flex flex-col",
    "center-center":
      "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center text-center flex flex-col",
    "center-bottom":
      "left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center text-center",
  };
  return (
    <div
      className={
        "absolute space-y-2 p-2 " + classes[position!] + " " + className
      }
    >
      {children}
    </div>
  );
};
