import { Role } from "@spotfinder2/util/types";
import { BrandIcon } from "./BrandIcon";
import React from "react";

export interface IBrandProps {
  shortForm?: boolean;
  className?: string;
  type?: Role;
}
export const Brand = ({
  shortForm = false,
  className,
  type = undefined,
}: IBrandProps) => {
  return (
    <div className={"grid place-items-center z-50 " + className}>
      <div className="text-xl">
        {shortForm ? (
          <div className="flex gap-1 ml-5">
            <BrandIcon /> SpotFinder2
          </div>
        ) : (
          <div className="flex items-center gap-2 font-medium tracking-tighter font-playfair">
            <BrandIcon />
            <div>
              <div className="flex gap-1">
                <div>SpotFinder2</div>
                {type ? <span className="text-xs">{type}</span> : null}
              </div>
              <div className="text-xs text-gray">Boyang Yu</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
