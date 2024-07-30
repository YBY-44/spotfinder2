"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { BrandIcon } from "../atoms/BrandIcon";
import React from "react";
import { IconArrowBack } from "@tabler/icons-react";
export interface IAuthLayoutProps {
  children: ReactNode;
  title: string;
}

export const AuthLayout = ({ children, title }: IAuthLayoutProps) => {
  return (
    <div className="grid min-h-[clac(100vh-4rem)] gap-4 overflow-hidden md:grid-cols-2 lg:grid-cols-4">
      <div className="relative h-[calc(100vh-4rem)]">
        <div className="flex flex-col justify-center items-center h-full p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg mx-auto">
            <h1 className="flex items-center gap2 mb-2 text-2xl">
              <BrandIcon />
              <div>{title}</div>
            </h1>
            {children}
            <div className="mt-4 text-sm text-gray-300">
              <Link href="/" className="flex gap-2 items-center">
                <IconArrowBack className="h-4 w-4" />
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
