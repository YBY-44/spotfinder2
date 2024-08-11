import React from "react";
import { CustomerBookings } from "@spotfinder2/ui/src/components/templates/CustomerBookings";
import { IsLoggedIn } from "@spotfinder2/ui/src/components/organisms/IsLoggedin";
export default function Page() {
  return (
    <IsLoggedIn>
      <CustomerBookings />
    </IsLoggedIn>
  );
}
