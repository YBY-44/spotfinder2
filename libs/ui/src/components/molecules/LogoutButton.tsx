"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { signOut } from "next-auth/react";
import { IconDoorExit } from "@tabler/icons-react";
import { Button } from "../atoms/Button";
import { useRouter } from "next/router";
export const LogoutButton = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: "/", // 退出登录后重定向到首页
        })
      }
      varient="outlined"
      className="flex gap-2"
    >
      <IconDoorExit size={20} />
      Logout
    </Button>
  );
};
