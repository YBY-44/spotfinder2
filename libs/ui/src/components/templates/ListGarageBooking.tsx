'use client';
import { useState } from 'react';
import { Tab, TabPanel, Tabs } from '../molecules/Tabs';
import { ShowGarageBookings } from '../organisms/ShowGarageBookings';
import { BookingStatus } from '@spotfinder2/network/src/gql/generated';
export interface ListBookingProps {
  garageId: number;
}
export const ListGaragesBookings = ({ garageId }: ListBookingProps) => {
  const [value, setValue] = useState<0 | 1 | 2>(0);
  return (
    <div>
      <Tabs
        value={value}
        onChange={(e, v) => {
          setValue(v);
        }}
        aria-label='bookings'
      >
        <Tab label='IN' />
        <Tab label='OUT' />
        <Tab label='RESLOVED' />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowGarageBookings
          garageId={garageId}
          status={[
            BookingStatus.Booked,
            BookingStatus.ValetPickedUp,
            BookingStatus.ValetAssignedForCheckIn,
          ]}
          showCheckIn
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowGarageBookings
          garageId={garageId}
          status={[
            BookingStatus.CheckedIn,
            BookingStatus.ValetAssignedForCheckOut,
          ]}
          showCheckOut
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ShowGarageBookings
          garageId={garageId}
          status={[
            BookingStatus.CheckedOut
          ]}
        />
      </TabPanel>
    </div>
  );
};
