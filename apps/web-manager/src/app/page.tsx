"use client";
import { IsLoggedIn } from "@spotfinder2/ui/src/components/organisms/IsLoggedin";
import { IsManager } from "@spotfinder2/ui/src/components/organisms/IsManager";
import { ListGarages } from "@spotfinder2/ui/src/components/organisms/ListGarages";
export default function Home() {
  return (
    <IsLoggedIn>
      <IsManager>
        {(companyId) => {
          return <ListGarages companyId={companyId}></ListGarages>;
        }}
      </IsManager>
    </IsLoggedIn>
  );
}
