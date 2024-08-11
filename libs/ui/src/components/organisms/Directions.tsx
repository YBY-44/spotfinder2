import { LatLng, LngLatTuple } from "@spotfinder2/util/types";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDebounce } from "@spotfinder2/util/hooks/async";
import { Source, Layer } from "react-map-gl";
import { useMapboxDirections } from "@spotfinder2/util/hooks/directions";
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

  const prevOriginRef = useRef<LatLng | undefined>(undefined);
  const prevDestinationRef = useRef<Partial<LatLng> | undefined>(undefined);

  const originDebounce = useDebounce(origin, 400);
  const destinationDebounce = useDebounce(destination, 400);

  const { data, distance, error, loading } = useMapboxDirections(
    originDebounce,
    destinationDebounce,
  );
  useEffect(() => {
    if (
      !originDebounce ||
      !destinationDebounce ||
      (prevOriginRef.current &&
        prevOriginRef.current.lat === originDebounce.lat &&
        prevOriginRef.current.lng === originDebounce.lng &&
        prevDestinationRef.current &&
        prevDestinationRef.current.lat === destinationDebounce.lat &&
        prevDestinationRef.current.lng === destinationDebounce.lng)
    ) {
      return;
    }
    prevOriginRef.current = originDebounce;
    prevDestinationRef.current = destinationDebounce;
    (async () => {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${originDebounce.lng},${originDebounce.lat};${destinationDebounce.lng},${destinationDebounce.lat}?access_token=${process.env.NEXT_PUBLIC_MAXBOX_TOKEN}&steps=true&overview=simplified`,
      );

      const data = await response.json();

      const coordinates =
        data?.routes[0]?.legs[0]?.steps?.map(
          (step: { maneuver: { location: any } }) => step.maneuver.location,
        ) || [];

      const newDistance = data.routes[0].distance || 0;

      setCood(coordinates);

      if (newDistance !== prevDistanceRef.current && setDistance) {
        setDistance(newDistance);
        prevDistanceRef.current = newDistance;
      }
    })();
    // if(setDistance){
    //   setDistance(distance || 0);
    // }
  }, [originDebounce, destinationDebounce, setDistance]);
  const dataOne = useMemo(
    () => ({
      type: "Feature" as const,
      properties: {},
      geometry: {
        type: "LineString" as const,
        coordinates: data,
      },
    }),
    [data],
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
