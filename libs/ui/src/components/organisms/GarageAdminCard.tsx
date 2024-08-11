import { GaragesQuery } from "@spotfinder2/network/src/gql/generated";
import { ReactNode } from "react";
import { MapLink } from "../molecules/MapLink";
import { IconTypes } from "../molecules/IconTypes";
export const GarageAdminCard = ({
  children,
  garage,
}: {
  children?: ReactNode;
  garage: GaragesQuery["garages"][0];
}) => {
  return (
    <div className="flex flex-col p-3 bg-white rounded-md shadow-md justify-between items-between">
      <p className="text-xs">#{garage.id}</p>
      <div className="flex items-start gap-2">
        <h2 className="mb-1 text-xl font-bold">{garage.displayName}</h2>
      </div>
      <div className="mb-2">
        {garage.verification?.verified ? (
          <span className="p-1 px-2 shadow text-xs bg-green-50 rounded-sm">
            Verified
          </span>
        ) : (
          <span className="p-1 px-2 shadow text-xs bg-red-50 rounded-sm">
            Not Verified
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {garage.address ? (
          <MapLink waypoint={[garage.address]}>
            <p className="text-xs font-medium text-gray-700 hover:underline underline-offset-4">
              {garage.address?.address}
            </p>
          </MapLink>
        ) : null}
      </div>
      <div className="mt-2 mb-4 flex gap-2">
        {garage.slotCounts.length === 0 ? (
          <div className="text-sm">No slots.</div>
        ) : null}
        {garage.slotCounts.map((slot, index) => {
          return (
            <div
              key={index}
              className="flex w-14 h-10 items-center justify-center border rounded-md"
            >
              {IconTypes[slot.type]}
              <span className="text-gray-500">{slot.count}</span>
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
};
