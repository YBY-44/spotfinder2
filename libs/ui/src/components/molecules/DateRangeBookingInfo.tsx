import { useState, useEffect } from "react";
import { IconArrowRightCircle } from "@tabler/icons-react";
import {
  differenceInMinutes,
  formDate,
  formTime,
  getTimeUnits,
} from "@spotfinder2/util/date";

export interface DateRangeBookingInfoProps {
  startTime?: string;
  endTime?: string;
}
export const DateRangeBookingInfo = ({
  startTime,
  endTime,
}: DateRangeBookingInfoProps) => {
  const [duration, setDuration] = useState<string | null>(null);
  useEffect(() => {
    if (!startTime || !endTime) {
      return;
    }
    const differenceInMilliseconds = differenceInMinutes({
      startTime: startTime,
      endTime: endTime,
    });
    if (differenceInMilliseconds < 0) {
      setDuration("Invalid time range");
      return;
    }
    setDuration(getTimeUnits(differenceInMilliseconds).timeString);
  }, [startTime, endTime]);
  if (!startTime || !endTime) {
    return null;
  }
  return (
    <>
      <div className="flex items-center justify-between gap-2 my-4">
        <div>
          <div className="text-lg font-bold">{formTime(startTime)}</div>
          <div className="text-xs text-gray-600">{formDate(startTime)}</div>
        </div>
        <div className="flex flex-col items-center justify-end">
          <IconArrowRightCircle />
          <div className="-mt-1 text-xs text-center text-gray-600">
            {duration ? duration : "Select Date"}
          </div>
        </div>
        <div className="text-right">
          <div>
            <div className="text-lg font-bold">{formTime(endTime)}</div>
            <div className="text-xs text-gray-600">{formDate(endTime)}</div>
          </div>
        </div>
      </div>
    </>
  );
};
