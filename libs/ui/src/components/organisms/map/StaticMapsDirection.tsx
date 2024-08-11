import polyline from "@mapbox/polyline";
import Image from "next/image";
import { useEffect } from "react";
export const StaticMap = ({
  start,
  end,
  padding = [100, 100, 100],
  pitch = 45,
  coordinates,
  className = "w-full aspect-square",
}: {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
  padding?: [number, number, number];
  pitch?: number;
  coordinates: [number, number][];
  className?: string;
}) => {
  console.log(coordinates);

  if (!coordinates.length) {
    return <div className="w-full bg-gray-100 shadow-xl aspect-square" />;
  }
  const encodedPolyline = polyline.fromGeoJSON({
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates,
    },
    properties: {},
  });
  const boundingBox = [
    Math.min(start.lng, end.lng),
    Math.min(start.lat, end.lat),
    Math.max(start.lng, end.lng),
    Math.max(start.lat, end.lat),
  ].join(",");
  const paddingString = padding.join(",");
  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-a+000(${start.lng},${start.lat}),pin-s-b+000(${end.lng},${end.lat}),path-2+000(${encodeURIComponent(encodedPolyline)})/[${boundingBox}]/600x600?padding=${paddingString}&access_token=${process.env.NEXT_PUBLIC_MAXBOX_TOKEN}`;
  return (
    <Image src={url} alt="Map" className={className} width={300} height={300} />
  );
};
