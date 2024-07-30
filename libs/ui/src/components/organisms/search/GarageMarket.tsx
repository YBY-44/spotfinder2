import { SearchGaragesQuery } from "@spotfinder2/network/src/gql/generated";
import { useKeypress } from "@spotfinder2/util/hooks/keys";
import { useState } from "react";
import { Marker } from "../map/MapMarker";
import { Dialog } from "../../atoms/Dialog";
import { ParkingIcon } from "../../atoms/Parkingicon";
import { FormProviderBookSlot } from "../../../../../forms/src/bookingSlot";
import { useWatch } from "react-hook-form";
import { FormTypeSearchGarages } from "@spotfinder2/forms/src/searchGarages";
import { BookSlotPopup } from "../BookSlotPopup";
import React from "react";
export const GarageMarket = ({
  marker,
}: {
  marker: SearchGaragesQuery["searchGarages"][number];
}) => {
  const [showPopup, setShowPopup] = useState(false);
  //   useKeypress(['Escape'], () => {
  //     setShowPopup(false);
  //   });
  const { endtime, starttime } = useWatch<FormTypeSearchGarages>();
  if (!marker.address?.lat || !marker.address?.lng) {
    return null;
  }
  return (
    <>
      <Dialog
        title="Booking"
        widthClassName="max-w-3xl"
        open={showPopup}
        setOpen={setShowPopup}
      >
        <FormProviderBookSlot defaultValues={{ endtime, starttime }}>
          <BookSlotPopup garage={marker} />
        </FormProviderBookSlot>
      </Dialog>
      <Marker
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setShowPopup((state) => {
            return !state;
          });
        }}
      >
        <ParkingIcon />
      </Marker>
    </>
  );
};
