import { FormTypeSearchGarages } from "../../searchGarages";

export const isStartTimeValid = (starttime: string) => {
  const startDate = new Date(starttime);
  const currentDate = new Date();
  return startDate.getTime() > currentDate.getTime();
};
export const isEndTimeValid = ({
  starttime,
  endtime,
}: {
  starttime: string;
  endtime: string;
}) => {
  const startDate = new Date(starttime);
  const endDate = new Date(endtime);
  return startDate.getTime() < endDate.getTime();
};
