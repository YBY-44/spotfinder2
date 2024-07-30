import React from "react";
import { ReactNode } from "react";
export const Cost = ({ title, price }: { title: string; price: ReactNode }) => {
  if (!price) {
    return null;
  }
  return (
    <div className="flex justify-between text-lg font-bold">
      <div>{title}</div>
      <div>{"$" + price + " AUD"}</div>
    </div>
  );
};
