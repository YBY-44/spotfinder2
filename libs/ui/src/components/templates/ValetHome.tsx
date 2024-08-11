import { useState } from "react";
import { Tab, Tabs, TabPanel } from "../molecules/Tabs";
import { ShowValetPickUpTrip } from "../organisms/ShowValetPickUpTrip";
import { ShowValetDropUpTrip } from "../organisms/ShowValetDropUpTrip";
export const ValetHome = () => {
  const [value, setValue] = useState<0 | 1>(0);
  return (
    <>
      <Tabs
        value={value}
        onChange={(e, v) => {
          setValue(v);
        }}
        aria-label="bookings"
      >
        <Tab label="PickUp" />
        <Tab label="Drop" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowValetPickUpTrip />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowValetDropUpTrip />
      </TabPanel>
    </>
  );
};
