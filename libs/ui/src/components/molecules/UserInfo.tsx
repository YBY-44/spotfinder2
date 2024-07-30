"use client";
import { BaseComponent } from "@spotfinder2/util/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export const UserInfo = ({ children, className }: BaseComponent) => {
  const session = useSession();
  console.log(session?.data?.user);
  const image = session?.data?.user?.image;
  const name = session?.data?.user?.name;
  const uid = session?.data?.user?.uid;
  return (
    <div className={`flex mt-2 mb-2 gap-2 ${children}`}>
      <Image
        src={image || "/profile.png"}
        alt=""
        width={400}
        height={400}
        className={
          "w-12 h-12 ml-2 mr-2 object-cover rounded-full border border-soild"
        }
      />
      <div>
        <div>Hi, {name || "Spoter"}</div>
        <div className="text-sm text-gray">{uid}</div>
      </div>
      {children}
    </div>
  );
};
