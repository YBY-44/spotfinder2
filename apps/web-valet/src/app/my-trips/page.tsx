"use client";
import { AuthLayout } from "@spotfinder2/ui/src/components/molecules/AuthLayout";
import { LoginForm } from "@spotfinder2/ui/src/components/templates/LoginForm";
import { IsLoggedIn } from "@spotfinder2/ui/src/components/organisms/IsLoggedin";
import { IsValet } from "@spotfinder2/ui/src/components/organisms/IsValet";
import { ValetTrip } from "@spotfinder2/ui/src/components/templates/ValetTrip";
import React from "react";
export default function Page() {
  return (
    <IsLoggedIn>
      {(uid) => (
        <IsValet uid={uid}>
          <ValetTrip uid={uid} />
        </IsValet>
      )}
    </IsLoggedIn>
  );
}
