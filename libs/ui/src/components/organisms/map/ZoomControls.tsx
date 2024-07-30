import { MouseEventHandler, ReactNode } from "react";
import { IconMinus, IconParking, IconPlus } from "@tabler/icons-react";
import { useMap } from "react-map-gl";
import React from "react";
export interface IZoomControlsProps {}

const MapControls = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col overflow-hidden gap-0.5 space-y rounded shadow-lg device-primary-800 backdrop-blur-sm">
      {children}
    </div>
  );
};

const ZoomControlButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-white bg-white/40"
      type="button"
    >
      {children}
    </button>
  );
};
const ZoomIn = () => {
  const { current: map } = useMap();
  return (
    <ZoomControlButton
      onClick={() => {
        return map?.zoomIn();
      }}
    >
      <IconPlus className="p-1.5 w-8 h-8 text-black" />
    </ZoomControlButton>
  );
};

const ZoomOut = () => {
  const { current: map } = useMap();
  return (
    <ZoomControlButton onClick={() => map?.zoomOut()}>
      <IconMinus className="p-1.5 w-8 h-8 text-black" />
    </ZoomControlButton>
  );
};

export const VCZoomControls = ({
  onClick,
  Icon = IconParking,
}: {
  onClick?: (latLng: { lng: number; lat: number }) => void;
  Icon?: typeof IconParking;
}) => {
  const { current: map } = useMap();
  return (
    <ZoomControlButton
      onClick={() => {
        const { lng, lat } = map?.getCenter() as { lng: number; lat: number };
        onClick?.({ lng, lat });
      }}
    >
      <Icon className="p-1.5 w-8 h-8 text-black" />
    </ZoomControlButton>
  );
};

MapControls.ZoomIn = ZoomIn;
MapControls.ZoomOut = ZoomOut;
MapControls.CenterOfMap = VCZoomControls;

export default MapControls;

export const InitialZoomControls = ({ children }: { children?: ReactNode }) => {
  return (
    <MapControls>
      <ZoomIn />
      <ZoomOut />
      {children}
    </MapControls>
  );
};
