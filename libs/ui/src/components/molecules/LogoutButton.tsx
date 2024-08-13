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
          .then(() => {
            // 确保执行登出后的其他逻辑，例如更新本地状态或重载页面
            console.log("User has been logged out.");
          })
          .catch((error) => {
            console.error("Error during sign out:", error);
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
