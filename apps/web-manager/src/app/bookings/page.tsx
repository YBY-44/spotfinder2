"use client";
import { IsLoggedIn } from "@spotfinder2/ui/src/components/organisms/IsLoggedin";
import { IsManager } from "@spotfinder2/ui/src/components/organisms/IsManager";
import { ListGaragesBookings } from "@spotfinder2/ui/src/components/templates/ListGarageBooking";
export default function Page({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  console.log(searchParams);
  const garageId = Number(searchParams["garageId"]);
  return (
    <IsLoggedIn>
      <IsManager>
        <ListGaragesBookings garageId={garageId} />
      </IsManager>
    </IsLoggedIn>
  );
}
