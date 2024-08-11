import { useTakeStep } from "@spotfinder2/util/hooks/pagination";
import { useQuery } from "@apollo/client";
import {
  BookingStatus,
  PickUpTripDocument,
  SortOrder,
} from "@spotfinder2/network/src/gql/generated";
import { ShowData } from "./ShowData";
import { ValetTrip } from "../templates/ValetTrip";
import { ValetTripCard } from "./ValetTripCard";
import { Reveal } from "../molecules/Reveal";
import { AssignValetButton } from "./AssignValetButton";
export const ShowValetPickUpSelf = ({ uid }: { uid: string }) => {
  const { take, setTake, skip, setSkip } = useTakeStep();
  const { data, loading } = useQuery(PickUpTripDocument, {
    variables: {
      skip,
      take,
      orderBy: { startTime: SortOrder.Asc },
      where: {
        BookingTimeline: {
          // none: {
          //   status: BookingStatus.CheckedIn
          // },
          some: {
            status: BookingStatus.ValetAssignedForCheckIn,
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
            start={{
              lat: booking.valetAssignment?.pickupLat,
              lng: booking.valetAssignment?.pickupLng,
            }}
            end={booking.slot.garage.address}
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
              {booking.status === BookingStatus.ValetAssignedForCheckIn ? (
                <AssignValetButton
                  bookingId={booking.id}
                  status={BookingStatus.ValetStopped}
                  now={booking.status}
                >
                  FINISHED
                </AssignValetButton>
              ) : null}
            </div>
          </ValetTripCard>
        );
      })}
    </ShowData>
  );
};
