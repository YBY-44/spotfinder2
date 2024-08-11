import {
  BookingStatus,
  BookingsForCustomerDocument,
} from "@spotfinder2/network/src/gql/generated";
import { useSession } from "next-auth/react";
import { useTakeStep } from "@spotfinder2/util/hooks/pagination";
import { useQuery } from "@apollo/client";
import { ShowData } from "./ShowData";
import { CustomerBookingCard } from "../molecules/CustomerBookingCard";
export const ShowCustomerBookings = ({
  garageId,
  statuses,
  showCheckIn = false,
  showCheckOut = false,
}: {
  garageId?: number;
  statuses: BookingStatus[];
  showCheckIn?: boolean;
  showCheckOut?: boolean;
}) => {
  const session = useSession();
  const uid = session?.data?.user?.uid;
  const { skip, setSkip, take, setTake } = useTakeStep();
  const { data, error, loading } = useQuery(BookingsForCustomerDocument, {
    variables: {
      skip,
      take,
      where: {
        status: { in: statuses },
        customerId: { equals: uid },
      },
    },
  });
  return (
    <ShowData
      error={error?.message}
      loading={loading}
      pagination={{
        skip,
        setSkip,
        take,
        setTake,
        resultCount: data?.bookings.length,
        totalCount: data?.bookingsCount.count,
      }}
    >
      {data?.bookings.map((booking) => {
        return <CustomerBookingCard key={booking.id} booking={booking} />;
      })}
    </ShowData>
  );
};
