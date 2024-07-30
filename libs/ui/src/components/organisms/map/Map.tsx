import React from "react";
import MapGl, { Map as MapPorts, useMap } from "react-map-gl";
type MapProps = React.ComponentProps<typeof MapGl> & { height?: string };

export const Map = ({ height = "calc(100vh - 4rem)", ...props }: MapProps) => {
  return (
    <MapGl
      {...props}
      projection={{ name: "globe" }}
      mapStyle={"mapbox://styles/mapbox/streets-v11"}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAXBOX_TOKEN}
      style={{ height }}
      scrollZoom={false}
    >
      <StyleMap />
      {props.children}
    </MapGl>
  );
};

export const StyleMap = () => {
  const { current } = useMap();
  current?.on("style.load", () => {
    current?.getMap().setFog({
      color: "rgb(255, 255, 255)",
      range: [0, 10],
      "high-color": "rgb(200, 200, 200)",
      "horizon-blend": 0.05,
      "space-color": "rgb(150, 150, 150)",
      "star-intensity": 0.5,
    });
  });
  return null;
};
