import { SlotType } from "@spotfinder2/network/src/gql/generated";
import {
  IconBike,
  IconMotorbike,
  IconCar,
  IconTir,
  IconMoonStars,
  IconSunset,
  IconSunrise,
  IconSun,
} from "@tabler/icons-react";
import React from "react";

export const IconTypes = {
  [SlotType.Car]: <IconCar className="w-6 h-6" />,
  [SlotType.Heavy]: <IconTir className="w-6 h-6" />,
  [SlotType.Bike]: <IconMotorbike className="w-6 h-6" />,
  [SlotType.Bicycle]: <IconBike className="w-6 h-6" />,
};
export const IconType = ({
  time,
  className,
}: {
  time: string;
  className: string;
}) => {
  const date = new Date(time);
  const hours = date.getHours();
  if (hours >= 4 && hours < 10) {
    return <IconSunrise className={className} />;
  }
  if (hours >= 10 && hours < 16) {
    return <IconSun className={className} />;
  }
  if (hours >= 16 && hours < 20) {
    return <IconSunset className={className} />;
  }
  return <IconMoonStars className={className} />;
};
