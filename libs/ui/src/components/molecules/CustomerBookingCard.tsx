import { BookingsForCustomerQuery } from "@spotfinder2/network/src/gql/generated";
import { StartEndDateCard } from "../organisms/DateCard";
import { MapLink } from "./MapLink";
import { StaticMapSample } from "../organisms/map/StaticMapSample";
import { TitleStrongValue } from "../atoms/TitleValue";
import { Reveal } from "../molecules/Reveal";
import { Accordion } from "../atoms/Accordion";
import { TitleValue } from "../atoms/TitleValue";
import { format } from "date-fns";
export interface CustomerBookingCardProps {
  booking: NonNullable<BookingsForCustomerQuery["bookings"]>[number];
}
export const CustomerBookingCard = ({ booking }: CustomerBookingCardProps) => {
  const lat = booking?.slot?.garage?.address?.lat || 0;
  const lng = booking?.slot?.garage?.address?.lng || 0;

  return (
    <div className="shadow-lg bg-white p-2 rounded-md">
      <div className="flex flex-col gap-2">
        <StartEndDateCard
          startTime={booking.startTime}
          endTime={booking.endTime}
        />
        <MapLink waypoint={[{ lat, lng }]}>
          <StaticMapSample position={{ lat, lng }} className="h-full w-full" />
        </MapLink>
      </div>
      <div className="grid grid-cols-2 w-full gap-2 p-2">
        <TitleStrongValue title={"Solt"}>
          {booking.slot?.displayName}
        </TitleStrongValue>
        <TitleStrongValue title={"Vehicle number"}>
          {booking.vehicleNumber}
        </TitleStrongValue>
        <TitleStrongValue title={"Address"}>
          <div>
            {booking.slot?.garage.address?.address}
            <div className="text-gray text-xs">
              {lat.toFixed(2)},{lng.toFixed(2)}
            </div>
          </div>
        </TitleStrongValue>
        <TitleStrongValue title={"Code"}>
          <Reveal secret={booking.passcode || ""} />
        </TitleStrongValue>
        <Accordion
          defaultOpen={false}
          title={
            <TitleStrongValue title={"Status"}>
              <div className="font-bold">
                {booking.status?.split("_").join(" ")}
              </div>
            </TitleStrongValue>
          }
        >
          <div className="flex flex-col gap-2">
            {booking.bookingTimeline.map((timeline, index) => {
              return (
                <div key={timeline.timestamp} className="flex gap-2">
                  <TitleValue title={timeline.status}>
                    {format(new Date(timeline.timestamp), "yyyy-MM-dd hh:mm a")}
                  </TitleValue>
                </div>
              );
            })}
          </div>
        </Accordion>
      </div>
    </div>
  );
};
