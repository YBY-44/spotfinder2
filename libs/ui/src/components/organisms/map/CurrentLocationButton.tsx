import { useMap } from "react-map-gl";
import { Button } from "../../atoms/Button";
import React from "react";
import { IconCurrentLocation } from "@tabler/icons-react";

export interface CurrentLocationButton {}

export const CurrentLocationButton = () => {
  const { current: map } = useMap();
  return (
    <Button
      varient="text"
      className="hover:bg-gray-200"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            map?.flyTo({ center: { lng: longitude, lat: latitude }, zoom: 10 });
          },
          (error) => {
            console.error(error);
          },
          { enableHighAccuracy: true, timeout: 20000 },
        );
      }}
    >
      <IconCurrentLocation className="stroke-1.5 rounded-md" />
    </Button>
  );
};
