import { useQuery } from "@apollo/client";
import { ValetPickupsDocument } from "@spotfinder2/network/src/gql/generated";
import { useTakeStep } from "@spotfinder2/util/hooks/pagination";
import { ShowData } from "./ShowData";
import { ValetTripCard } from "./ValetTripCard";
import { AssignValetButton } from "./AssignValetButton";
import { BookingStatus } from "@spotfinder2/network/src/gql/generated";
export const ShowValetPickUpTrip = () => {
  const { data, loading } = useQuery(ValetPickupsDocument);
  const { take, skip, setTake, setSkip } = useTakeStep();
  return (
    <ShowData
      pagination={{
        take,
        setTake,
        skip,
        setSkip,
        totalCount: data?.valetPickups.length,
        resultCount: data?.valetPickupsTotal,
      }}
      title="Valet Pickups"
      loading={loading}
    >
      {data?.valetPickups.map((booking) => {
        return (
          <ValetTripCard
            key={booking.id}
            booking={{
              id: booking.id,
              time: booking.startTime,
            }}
            start={{
              lat: booking?.valetAssignment?.pickupLat || undefined,
              lng: booking?.valetAssignment?.pickupLng || undefined,
            }}
            end={booking.slot.garage.address}
          >
            <AssignValetButton
              now={undefined}
              bookingId={booking.id}
              status={BookingStatus.ValetAssignedForCheckIn}
            >
              Accept
            </AssignValetButton>
          </ValetTripCard>
        );
      })}
    </ShowData>
  );
};
