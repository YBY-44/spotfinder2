import { Icon } from '@mui/material';
import {
  BookingStatus,
  QueryMode,
} from '@spotfinder2/network/src/gql/generated';
import { IconSearch } from '@tabler/icons-react';
import { use, useState } from 'react';
import { ShowData } from './ShowData';
import { useQuery } from '@apollo/client';
import { BookingsForGarageDocument } from '@spotfinder2/network/src/gql/generated';
import { useTakeStep } from '@spotfinder2/util/hooks/pagination';
import { ManageBookingCard } from './ManageBookingCard';
import { CheckInOutButton } from './CheckInOutButton';
export const ShowGarageBookings = ({
  garageId,
  status,
  showCheckIn = false,
  showCheckOut = false,
}: {
  garageId: number;
  status: BookingStatus[];
  showCheckIn?: boolean;
  showCheckOut?: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { take, setTake, skip, setSkip } = useTakeStep();
  const { data, loading, error } = useQuery(BookingsForGarageDocument, {
    variables: {
      skip,
      take,
      where: {
        status: { in: status },
        Slot: {
          is: {
            garageId: { equals: garageId },
          },
        },
        vehicleNumber: { contains: searchTerm },
        ...(searchTerm && {
          vehicleNumber: {
            contains: searchTerm,
            mode: QueryMode.Insensitive,
          },
        }),
      },
    },
  });
  console.log('data', data);
  return (
    <div className='mt-4'>
      <div className='flex justify-center mb-8'>
        <div className='flex justify-start items-center gap-2 w-full max-w-xl rounded-full shadow-lg bg-white px-4 hover:shadow-xl focus:shadow-xl duration-300'>
          <IconSearch />
          <input
            placeholder='Search vehicle number'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className='py-2 m-0 text-sm flex-grow py-4 bg-transparent focus:outline-none'
          />
        </div>
      </div>
      <ShowData
        loading={loading}
        pagination={{
          skip,
          take,
          setSkip,
          setTake,
          resultCount: data?.bookingsForGarage.length,
          totalCount: data?.bookingsCount.count,
        }}
      >
        {' '}
        {data?.bookingsForGarage.map((booking) => {
          return (
            <div key={booking.id}>
              <ManageBookingCard booking={booking} />
              {showCheckIn ? (
                <CheckInOutButton
                  bookingId={booking.id}
                  status={BookingStatus.CheckedIn}
                  buttonText='Check In'
                />
              ) : null}
            {showCheckOut ? (
                <CheckInOutButton
                  bookingId={booking.id}
                  status={BookingStatus.CheckedOut}
                  buttonText='Check Out'
                />
              ) : null}
            </div>
            
          );
        })}
      </ShowData>
    </div>
  );
};
