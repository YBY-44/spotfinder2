import { useState } from "react";
import { Tab, Tabs, TabPanel } from "../molecules/Tabs";
import { ShowValetPickUpSelf } from "../organisms/ShowValetPickUpSelf";
import { ShowValetDropUpSelf } from "../organisms/ShowValetDropUpSelf";
export const ValetTrip = ({ uid }: { uid: string }) => {
  const [value, setValue] = useState<0 | 1>(0);
  return (
    <>
      <Tabs
        value={value}
        onChange={(e, v) => {
          setValue(v);
        }}
        aria-label="trips"
      >
        <Tab label="PickUp Order" />
        <Tab label="Return Order" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowValetPickUpSelf uid={uid} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowValetDropUpSelf uid={uid} />
      </TabPanel>
    </>
  );
};
