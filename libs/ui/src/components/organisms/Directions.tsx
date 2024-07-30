import { LatLng, LngLatTuple } from "@spotfinder2/util/types";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDebounce } from "@spotfinder2/util/hooks/async";
import { Source, Layer } from "react-map-gl";

export const Directions = ({
  origin,
  destination,
  sourceId,
  setDistance,
}: {
  origin?: LatLng;
  destination?: Partial<LatLng>;
  sourceId: string;
  setDistance: (distance: number) => void;
}) => {
  const [cood, setCood] = useState<Partial<LngLatTuple[]>>([]);
  const prevDistanceRef = useRef<number | undefined>(undefined);
  const originDebounce = useDebounce(origin, 400);
  console.log("originDebounce: ", originDebounce);
  const destinationDebounce = useDebounce(destination, 400);
  console.log("destinationDebounce: ", destinationDebounce);
  useEffect(() => {
    if (!originDebounce || !destinationDebounce) {
      setCood([]);
      return;
    }
    (async () => {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${originDebounce.lng},${originDebounce.lat};${destinationDebounce.lng},${destinationDebounce.lat}?access_token=${process.env.NEXT_PUBLIC_MAXBOX_TOKEN}&steps=true&overview=simplified`,
      );
      const data = await response.json();
      const coord =
        data?.routes[0]?.legs[0]?.steps?.map(
          (step: {
            maneuver: {
              location: LngLatTuple;
            };
          }) => {
            return step.maneuver.location;
          },
        ) || [];
      const newDistance = data?.routes[0]?.distance || 0;
      setCood(coord);
      if (newDistance !== prevDistanceRef.current && setDistance) {
        setDistance(newDistance);
        prevDistanceRef.current = newDistance;
      }
    })();
  }, [originDebounce, destinationDebounce, setDistance]);

  const dataOne = useMemo(
    () => ({
      type: "Feature" as const,
      properties: {},
      geometry: {
        type: "LineString" as const,
        coordinates: cood,
      },
    }),
    [cood],
  );
  return (
    <Source id={sourceId} type="geojson" data={dataOne}>
      <Layer
        id={sourceId}
        type="line"
        source={"my-data"}
        paint={{
          "line-color": "rgb(0, 0, 0)",
          "line-width": 2,
        }}
      />
    </Source>
  );
};
