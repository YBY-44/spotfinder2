"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { signOut } from "next-auth/react";
import { IconDoorExit } from "@tabler/icons-react";
import { Button } from "../atoms/Button";
export const LogoutButton = () => {
  return (
    <Button onClick={() => signOut()} varient="outlined" className="flex gap-2">
      <IconDoorExit size={20} />
      Logout
    </Button>
  );
};
