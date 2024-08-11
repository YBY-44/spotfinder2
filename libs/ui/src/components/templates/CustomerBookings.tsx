"use client";
import { Tab, Tabs, TabPanel } from "../molecules/Tabs";
import { useState } from "react";
import { ShowCustomerBookings } from "../organisms/ShowCustomerBookings";
import { BookingStatus } from "@spotfinder2/network/src/gql/generated";
export const CustomerBookings = () => {
  const [value, setValue] = useState<0 | 1>(1);
  return (
    <>
      <Tabs
        value={value}
        onChange={(e, v) => {
          setValue(v);
        }}
        aria-label="bookings"
      >
        <Tab label={"PAST"} />
        <Tab label={"ON GOING"} />
        <Tab label={"UP COMMING"} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowCustomerBookings statuses={[BookingStatus.CheckedOut]} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowCustomerBookings
          statuses={[
            BookingStatus.Booked,
            BookingStatus.ValetStopped,
            BookingStatus.ValetAssignedForCheckIn,
            BookingStatus.CheckedIn,
            BookingStatus.ValetAssignedForCheckOut,
          ]}
        />
      </TabPanel>
    </>
  );
};
