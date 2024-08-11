import { useMapboxDirections } from "@spotfinder2/util/hooks/directions";
import { LatLng } from "@spotfinder2/util/types";
import { ReactNode } from "react";
import { AlertSection } from "../molecules/AlertSection";
import { isLatLng } from "@spotfinder2/util";
import { MapLink } from "../molecules/MapLink";
import { StaticMap } from "../organisms/map/StaticMapsDirection";
import { format } from "date-fns";
export interface ValetTripCardProps {
  start?: Partial<LatLng> | null;
  end?: Partial<LatLng> | null;
  booking: {
    id: number;
    time: string;
  };
  children: ReactNode;
  garage?: Partial<LatLng> | null;
}

export const ValetTripCard = ({
  start,
  end,
  booking,
  children,
  garage,
}: ValetTripCardProps) => {
  const { data, distance, error, loading } = useMapboxDirections(start, end);
  if (!isLatLng(start) || !isLatLng(end)) {
    return (
      <AlertSection>
        <div className="">Some thing wents wrong</div>
        <div className="text-xs">Start & end location not set.</div>
      </AlertSection>
    );
  }
  return (
    <div className="p-1.5 bg-white shadow-lg rounded-md">
      <MapLink
        waypoint={[
          { lat: start.lat, lng: start.lng },
          { lat: end.lat, lng: end.lng },
        ]}
      >
        <StaticMap start={start} end={end} coordinates={data} />
      </MapLink>
      <div className="mt-1.5 p-3 pb-1 bg-black/5 space-y-2 rounded-md">
        <div className="flex justify-between gap-2">
          <div>
            <div className="text-lg font-semibold">
              {format(new Date(booking.time), "p")}
            </div>
            <div className="text-xs text-gray">
              {format(new Date(booking.time), "PP")}
            </div>
          </div>
          <div className="font-medium">
            {((distance || 0) / 1000).toFixed(2)} Km
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
