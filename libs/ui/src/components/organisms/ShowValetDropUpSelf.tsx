import { useTakeStep } from "@spotfinder2/util/hooks/pagination";
import { useQuery } from "@apollo/client";
import {
  BookingStatus,
  DropUpTripDocument,
  SortOrder,
} from "@spotfinder2/network/src/gql/generated";
import { ValetTripCard } from "./ValetTripCard";
import { Reveal } from "../molecules/Reveal";
import { AssignValetButton } from "./AssignValetButton";
import { ShowData } from "./ShowData";
export const ShowValetDropUpSelf = ({ uid }: { uid: string }) => {
  const { take, setTake, skip, setSkip } = useTakeStep();
  const { data, loading } = useQuery(DropUpTripDocument, {
    variables: {
      skip,
      take,
      orderBy: { startTime: SortOrder.Asc },
      where: {
        BookingTimeline: {
          some: {
            status: BookingStatus.ValetAssignedForCheckOut,
          },
        },
        ValetAssignment: {
          is: {
            pickupValetId: {
              equals: uid,
            },
          },
        },
      },
    },
  });
  return (
    <ShowData
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.bookingsForValet.length || 0,
        totalCount: data?.bookingsCount.count || 0,
      }}
    >
      {data?.bookingsForValet.map((booking) => {
        return (
          <ValetTripCard
            booking={{ id: booking.id, time: booking.startTime }}
            start={booking.slot.garage.address}
            end={{
              lat: booking.valetAssignment?.returnLat || 0,
              lng: booking.valetAssignment?.returnLng || 0,
            }}
            key={booking.id}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-xl font-semibold">
                  {booking.vehicleNumber}
                </div>
                <Reveal
                  secret={booking.passcode}
                  showInstruction={false}
                  className="w-full"
                />
              </div>
              <div className="text-sm">
                {booking.status?.split("_").join(" ")}
              </div>
              {booking.status === BookingStatus.ValetAssignedForCheckOut ? (
                <AssignValetButton
                  bookingId={booking.id}
                  status={BookingStatus.ValetReturned}
                  now={booking.status}
                >
                  RETURN VEHICLE
                </AssignValetButton>
              ) : null}
            </div>
          </ValetTripCard>
        );
      })}
    </ShowData>
  );
};
