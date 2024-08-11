import { ClassNames } from "@emotion/react";
import { LatLng } from "@spotfinder2/util/types";
import { IconMap2 } from "@tabler/icons-react";
import Link from "next/link";
import { ReactNode } from "react";
export interface MapLinkProps {
  waypoint: LatLng[];
  children?: ReactNode;
  className?: string;
}
export const MapLink = ({
  waypoint,
  children = <IconMap2 />,
  className,
}: MapLinkProps) => {
  if (waypoint.length === 0) {
    return null;
  }
  if (waypoint.length === 1) {
    const { lat, lng } = waypoint[0];
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    return (
      <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    );
  }
  const origin = waypoint[0];
  const destination = waypoint[waypoint.length - 1];
  const waypointsParam = waypoint
    .slice(1, -1)
    .map(({ lat, lng }) => {
      return lat + "," + lng;
    })
    .join("|");
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&waypoints=${waypointsParam}`;
  return (
    <Link
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className || ""}
    >
      {children}
    </Link>
  );
};
