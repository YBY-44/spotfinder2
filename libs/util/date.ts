import { time } from "console";
import { format } from "date-fns";
import pluralize from "pluralize";

export const toLocaleDateString = (date: Date) => {
  const timeZoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - timeZoneOffset).toISOString();
  return localDate;
};

export const formDate = (date: string) => {
  const dateObj = new Date(date);
  return format(dateObj, "dd/MM/yy");
};

export const formTime = (date: string) => {
  const dateObj = new Date(date);
  return format(dateObj, "HH:mm");
};

export const differenceInMinutes = ({
  startTime,
  endTime,
  unit = "milliseconds",
}: {
  startTime: string;
  endTime: string;
  unit?: "milliseconds" | "seconds" | "minutes" | "hours";
}) => {
  const diffMinutes =
    new Date(endTime).getTime() - new Date(startTime).getTime();
  switch (unit) {
    case "milliseconds":
      return diffMinutes;
    case "seconds":
      return diffMinutes / 1000;
    case "minutes":
      return diffMinutes / (1000 * 60);
    case "hours":
      return diffMinutes / (1000 * 60 * 60);
    default:
      throw new Error("Invalid time unit: " + unit);
  }
};

export const getTimeUnits = (seconds: number) => {
  let timeString = "";
  seconds = seconds / 1000;
  const day = Math.floor(seconds / (3600 * 24));
  seconds -= day * 3600 * 24;
  if (day > 0) {
    timeString += day + " " + pluralize("day", day);
  }
  const hour = Math.floor(seconds / 3600);
  if (hour > 0) {
    if (timeString !== "") {
      timeString += " ";
    }
    timeString += hour + " " + pluralize("hour", hour);
  }
  const minute = Math.floor((seconds % 3600) / 60);
  if (minute > 0) {
    if (timeString !== "") {
      timeString += " ";
    }
    timeString += minute + " " + pluralize("minute", minute);
  }
  return {
    timeString,
    day,
    hour,
    minute,
  };
};
