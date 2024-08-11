"use client";
import { ManageValet } from "@spotfinder2/ui/src/components/templates/ManageValet";
import { IsLoggedIn } from "@spotfinder2/ui/src/components/organisms/IsLoggedin";
export default function Page() {
  return (
    <IsLoggedIn>
      <ManageValet />
    </IsLoggedIn>
  );
}
