import { useMutation } from "@apollo/client";
import {
  CreateBookingTimelineDocument,
  namedOperations,
} from "@spotfinder2/network/src/gql/generated";
import { BookingStatus } from "@spotfinder2/network/src/gql/generated";
import { Button } from "../atoms/Button";
import { toast } from "../molecules/Toast";
export const CheckInOutButton = ({
  bookingId,
  status,
  buttonText,
  now,
}: {
  bookingId: number;
  status: BookingStatus;
  buttonText: string;
  now?: BookingStatus;
}) => {
  const [checkIn, { data, loading }] = useMutation(
    CreateBookingTimelineDocument,
  );
  const disabled = () => {
    if (now) {
      if (
        status === BookingStatus.CheckedIn &&
        (now === BookingStatus.Booked ||
          now === BookingStatus.ValetAssignedForCheckIn)
      ) {
        return true;
      }
      if (
        status === BookingStatus.CheckedOut &&
        now !== BookingStatus.ValetReturned
      ) {
        return true;
      }
    }
    return false;
  };
  console.log("now: " + now);
  console.log(disabled());
  return (
    <Button
      loading={loading}
      disabled={disabled() ? true : false}
      color="white"
      className="mt-1 shadow-md hover:bg-gray-50 duration-300"
      fullWidth
      onClick={() => {
        checkIn({
          variables: {
            createBookingTimelineInput: {
              bookingId: bookingId,
              status: status,
            },
          },
          awaitRefetchQueries: true,
          refetchQueries: [namedOperations.Query.BookingsForGarage],
          onCompleted: (data, clientOptions) => {
            if (status === BookingStatus.CheckedIn) {
              toast.success("Checked In Successfully");
            } else {
              toast.success("Checked Out Successfully");
            }
          },
          onError: (error) => {
            toast.error("Error Checking Bookings, " + error.message);
          },
        });
      }}
    >
      {disabled()
        ? "Waiting for Valet " +
          (status === BookingStatus.CheckedIn ? "In" : "Out")
        : buttonText}
    </Button>
  );
};
