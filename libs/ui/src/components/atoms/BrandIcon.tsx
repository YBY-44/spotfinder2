import React from "react";
import { ReactNode } from "react";
import Image from "next/image";
export interface IBrandIconProps {
  children?: ReactNode;
}
export const BrandIcon = ({
  children = (
    <Image src={"/LOGO.svg"} alt={"spotfinder2"} width={45} height={50} />
  ),
}: IBrandIconProps) => {
  return (
    <div className="inline-block">
      <div className="flex items-center justify-center border border-red rounded-lg w-full ">
        {children}
      </div>
    </div>
  );
};
