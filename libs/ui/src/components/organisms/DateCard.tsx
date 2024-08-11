import { getTimeUnits, differenceInMinutes } from "@spotfinder2/util/date";
import { IconArrowRightRhombus } from "@tabler/icons-react";

import { format } from "date-fns";

export interface DateCardProps {
  startTime: string;
  endTime: string;
}
const DateCard = ({
  dateTime,
  justify = "left",
}: {
  dateTime: string;
  justify?: "left" | "right";
}) => {
  const [date, time] = [
    format(new Date(dateTime), "dd MMM yyyy"),
    format(new Date(dateTime), "HH:mm"),
  ];
  return (
    <div
      className={
        "flex flex-col " + (justify === "right" ? " items-end" : "items-start")
      }
    >
      <div className="text-xl">{time}</div>
      <div className="text-xs text-gray-500">{date}</div>
    </div>
  );
};

export const StartEndDateCard = ({ startTime, endTime }: DateCardProps) => {
  const numOfHours = getTimeUnits(
    differenceInMinutes({ startTime, endTime, unit: "seconds" }),
  ).timeString;
  return (
    <div className="flex items-center justify-between gap-2 p-2">
      <DateCard dateTime={startTime} justify="left" />
      <div className="flex flex-col items-center">
        <IconArrowRightRhombus />
        <div className="text-xs">{numOfHours}</div>
      </div>
      <DateCard dateTime={endTime} justify="right" />
    </div>
  );
};
