import { useQuery } from "@apollo/client";
import {
  BookingStatus,
  ValetDropsDocument,
} from "@spotfinder2/network/src/gql/generated";
import { useTakeStep } from "@spotfinder2/util/hooks/pagination";
import { ShowData } from "./ShowData";
import { ValetTripCard } from "./ValetTripCard";
import { AssignValetButton } from "./AssignValetButton";
export const ShowValetDropUpTrip = () => {
  const { take, skip, setTake, setSkip } = useTakeStep();
  const { data, loading } = useQuery(ValetDropsDocument, {
    variables: {
      skip,
      take,
      status: BookingStatus.CheckedIn,
    },
  });
  return (
    <ShowData
      pagination={{
        take,
        setSkip,
        skip,
        setTake,
        resultCount: data?.valetDrops.length || 0,
        totalCount: data?.valetDropsTotal || 0,
      }}
      title="Valet Drops"
      loading={loading}
    >
      {data?.valetDrops.map((booking) => {
        return (
          <ValetTripCard
            key={booking.id}
            booking={{
              id: booking.id,
              time: booking.endTime,
            }}
            start={booking.slot.garage.address}
            end={{
              lat: booking?.valetAssignment?.returnLat || undefined,
              lng: booking?.valetAssignment?.returnLng || undefined,
            }}
          >
            <AssignValetButton
              now={BookingStatus.CheckedIn}
              bookingId={booking.id}
              status={BookingStatus.ValetAssignedForCheckOut}
            >
              Accept
            </AssignValetButton>
          </ValetTripCard>
        );
      })}
    </ShowData>
  );
};
