"use client";
import { IsLoggedIn } from "@spotfinder2/ui/src/components/organisms/IsLoggedin";
import { IsManager } from "@spotfinder2/ui/src/components/organisms/IsManager";
export default function Home() {
  return (
    <IsLoggedIn>
      <IsManager>Hello Manager</IsManager>
    </IsLoggedIn>
  );
}
