import { ReactNode } from "react";
import {
  BookingStatus,
  namedOperations,
} from "@spotfinder2/network/src/gql/generated";
import { useMutation } from "@apollo/client";
import { AssignValetDocument } from "@spotfinder2/network/src/gql/generated";
import { toast } from "../molecules/Toast";
import { Button } from "../atoms/Button";
export const AssignValetButton = ({
  bookingId,
  status,
  children,
  now,
}: {
  bookingId: number;
  status: BookingStatus;
  now?: BookingStatus;
  children: ReactNode;
}) => {
  const [assignValet, { data, loading }] = useMutation(AssignValetDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [
      namedOperations.Query.ValetPickups,
      namedOperations.Query.ValetDrops,
      namedOperations.Query.PickUpTrip,
      namedOperations.Query.DropUpTrip,
    ],
    onCompleted: (data) => {
      if (status === BookingStatus.ValetStopped) {
        toast.success(
          "You RETURN the order PICKUP-BOOKING-" + data?.assignValet.id,
        );
      } else if (status === BookingStatus.ValetAssignedForCheckIn) {
        toast.success(
          "You ACCEPT the order PICKUP-BOOKING-" + data?.assignValet.id,
        );
      } else if (status === BookingStatus.ValetReturned) {
        toast.success(
          "You FINSIH the order RETURN-BOOKING-" + data?.assignValet.id,
        );
      } else if (status === BookingStatus.ValetAssignedForCheckOut) {
        toast.success(
          "You ACCPET the order RETURN-BOOKING-" + data?.assignValet.id,
        );
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  console.log(data);
  const disabled = () => {
    if (now === status) {
      return true;
    }
    return false;
  };
  return (
    <Button
      disabled={disabled()}
      fullWidth
      loading={loading}
      color="black"
      varient="outlined"
      onClick={async () => {
        return await assignValet({
          variables: {
            bookingId,
            status,
          },
        });
      }}
    >
      {children}
    </Button>
  );
};
