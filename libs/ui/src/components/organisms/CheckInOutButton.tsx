import { useMutation } from '@apollo/client';
import {
  CreateBookingTimelineDocument,
  namedOperations,
} from '@spotfinder2/network/src/gql/generated';
import { BookingStatus } from '@spotfinder2/network/src/gql/generated';
import { Button } from '../atoms/Button';
import { toast } from '../molecules/Toast';
export const CheckInOutButton = ({
  bookingId,
  status,
  buttonText,
}: {
  bookingId: number;
  status: BookingStatus;
  buttonText: string;
}) => {
  const [checkIn, { data, loading }] = useMutation(CreateBookingTimelineDocument);
  return (
    <Button
      loading={loading}
      color='white'
      className='mt-1 shadow-md hover:bg-gray-50 duration-300'
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
            if(status === BookingStatus.CheckedIn) {
                toast.success('Checked In Successfully');
            }
            else{
                toast.success('Checked Out Successfully');
            }
          },
          onError: (error) => {
            toast.error('Error Checking Bookings, ' + error.message);
          },
        });
      }}
    >
      {buttonText}
    </Button>
  );
};
