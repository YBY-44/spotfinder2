"use client";
import Image from "next/image";
import { IsLoggedIn } from "@spotfinder2/ui/src/components/organisms/IsLoggedin";
import { IsValet } from "@spotfinder2/ui/src/components/organisms/IsValet";
import { ListValets } from "@spotfinder2/ui/src/components/organisms/ListValets";
import { ValetHome } from "@spotfinder2/ui/src/components/templates/ValetHome";
import React from "react";
export default function Home() {
  return (
    <IsLoggedIn>
      {(uid) => (
        <IsValet uid={uid}>
          <ValetHome />
        </IsValet>
      )}
    </IsLoggedIn>
  );
}
