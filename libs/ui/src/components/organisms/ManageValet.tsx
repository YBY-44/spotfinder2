"use client";
import { SearchGaragesQuery } from "@spotfinder2/network/src/gql/generated";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFormContext, useWatch } from "react-hook-form";
import { FormSchemaBookingSlot } from "@spotfinder2/forms/src/bookingSlot";
import { Switch } from "../atoms/Switch";
import { Label } from "@headlessui/react";
import { Map } from "../organisms/map/Map";
import { Marker } from "../organisms/map/MapMarker";
import { ParkingIcon } from "../atoms/Parkingicon";
import { IconUser } from "@tabler/icons-react";
import { Directions } from "./Directions";
import { InitialZoomControls } from "../organisms/map/ZoomControls";
import { Panel } from "../organisms/map/Panel";
export const ManageValet = ({
  garage,
}: {
  garage: SearchGaragesQuery["searchGarages"][number];
}) => {
  const [showValet, setShowValet] = useState(false);
  const { setValue } = useFormContext<FormSchemaBookingSlot>();
  const { valet } = useWatch<FormSchemaBookingSlot>();
  const lat = garage?.address?.lat;
  const lng = garage?.address?.lng;
  if (!lat || !lng) {
    toast("Garage location is not set.");
    return <div>Something went wrong.</div>;
  }
  return (
    <div className="pt-5 pb-5 pl-2 pr-2 space-y-3 bg-gray-25">
      <div className="text-xl font-bold">VALET CHOICE</div>
      <p className="text-sm text-gray">
        Our Valets will whisk your car away to its reserved spot and bring it
        back when you&apos;re ready to leave. It is like magic, but with cars.
      </p>
      <Switch
        checked={showValet}
        label={"Need Valet"}
        onChange={(e) => {
          setShowValet(e);
          if (!e) {
            setValue("valet", undefined, { shouldValidate: true });
            setValue("valet.differentLocation", false);
          } else {
            setValue("valet.pickUpInfo", { lat: lat, lng: lng });
            setValue("valet.dropUpInfo", { lat: lat, lng: lng });
          }
        }}
      />
      {showValet ? (
        <div className="mb-6 space-y-3">
          <p className="text-sm text-gray">
            Want your car to be picked up and dropped off at different
            locations? No problem. Choose a different location for pick up and
            drop off then we will assure your car is waiting for you at the
            right spot.
          </p>
          <Switch
            checked={valet?.differentLocation || false}
            label={"Need a different drop off location?"}
            onChange={(e) => {
              setValue("valet.differentLocation", e);
              if (!e) {
                setValue("valet.dropUpInfo", {
                  lat: valet?.pickUpInfo?.lat || lat,
                  lng: valet?.pickUpInfo?.lng || lng,
                });
              } else {
                setValue("valet.dropUpInfo", { lat: lat, lng: lng });
              }
            }}
          />

          <Map
            initialViewState={{
              latitude: lat,
              longitude: lng,
              zoom: 12,
            }}
            height="50vh"
          >
            <Panel position="right-center">
              <InitialZoomControls />
            </Panel>
            <Marker latitude={lat} longitude={lng}>
              <ParkingIcon />
            </Marker>
            {valet?.pickUpInfo?.lng && valet.pickUpInfo.lat ? (
              <>
                <Marker
                  pitchAlignment="auto"
                  longitude={valet?.pickUpInfo?.lng}
                  latitude={valet?.pickUpInfo?.lat}
                  draggable
                  onDragEnd={({ lngLat }) => {
                    const { lng, lat } = lngLat;
                    setValue("valet.pickUpInfo.lat", lat || 0);
                    setValue("valet.pickUpInfo.lng", lng || 0);
                    if (!valet.differentLocation) {
                      setValue("valet.dropUpInfo.lat", lat || 0);
                      setValue("valet.dropUpInfo.lng", lng || 0);
                    }
                  }}
                >
                  <div className="flex flex-col items-center">
                    <IconUser />
                    <span>
                      Pick Up {!valet.differentLocation ? "& Drop off" : ""}
                    </span>
                  </div>
                </Marker>
                <Directions
                  sourceId={"pickup_route"}
                  origin={{ lat, lng }}
                  destination={{
                    lat: valet.pickUpInfo.lat,
                    lng: valet.pickUpInfo.lng,
                  }}
                  setDistance={(distance) => {
                    setValue("valet.pickUpInfo.distance", distance);
                  }}
                />
              </>
            ) : null}

            {valet?.differentLocation &&
            valet.dropUpInfo?.lat &&
            valet.dropUpInfo.lng ? (
              <>
                <Marker
                  pitchAlignment="auto"
                  longitude={valet?.dropUpInfo?.lng}
                  latitude={valet?.dropUpInfo?.lat}
                  draggable
                  onDragEnd={({ lngLat }) => {
                    const { lng, lat } = lngLat;
                    setValue("valet.dropUpInfo.lat", lat || 0);
                    setValue("valet.dropUpInfo.lng", lng || 0);
                    if (!valet.differentLocation) {
                      setValue("valet.pickUpInfo.lat", lat || 0);
                      setValue("valet.pickUpInfo.lng", lng || 0);
                    }
                  }}
                >
                  <div className="flex flex-col items-center">
                    <IconUser />
                    <span>Drop Off</span>
                  </div>
                </Marker>
                <Directions
                  sourceId={"dropup_route"}
                  origin={{ lat, lng }}
                  destination={{
                    lat: valet.dropUpInfo.lat,
                    lng: valet.dropUpInfo.lng,
                  }}
                  setDistance={(distance) => {
                    setValue("valet.dropUpInfo.distance", distance);
                  }}
                />
              </>
            ) : null}
            {/* {valet?.dropUpInfo?.lng && valet.dropUpInfo.lat ? (
                <>
                <Marker
                >

                </Marker>
                </>
              ): null} */}
          </Map>
        </div>
      ) : null}
    </div>
  );
};
