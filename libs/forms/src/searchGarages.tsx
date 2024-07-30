import { SlotType } from "@spotfinder2/network/src/gql/generated";
import { start } from "repl";
import { z } from "zod";
import { toLocaleDateString } from "@spotfinder2/util/date";
import { ReactNode } from "react";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEndTimeValid, isStartTimeValid } from "./adapter/util/index";
const minMaxTuple = z.tuple([z.number(), z.number()]);
export const formSchemaSearchGarages = z.object({
  starttime: z.string(),
  endtime: z.string(),

  locationFilter: z.object({
    ne_lat: z.number(),
    ne_lng: z.number(),
    sw_lat: z.number(),
    sw_lng: z.number(),
  }),

  type: z.nativeEnum(SlotType).array(),
  pricePerHour: minMaxTuple.optional(),
  height: minMaxTuple.optional(),
  width: minMaxTuple.optional(),
  length: minMaxTuple.optional(),

  skip: z.number().optional(),
  take: z.number().optional(),
});

export type FormTypeSearchGarages = z.infer<typeof formSchemaSearchGarages>;

formSchemaSearchGarages
  .refine(
    ({ endtime, starttime }) => {
      return isStartTimeValid(starttime);
    },
    {
      message: "Start time must be in the future",
      path: ["startime"],
    },
  )
  .refine(
    ({ starttime, endtime }) => {
      isEndTimeValid({ starttime, endtime });
    },
    {
      message: "End time must be after start time",
      path: ["endtime"],
    },
  );

export const getCurrentTimewithOneHourLater = () => {
  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + 5);
  const OneHourLater = new Date(currentTime);
  OneHourLater.setHours(currentTime.getHours() + 1);
  return {
    startTime: toLocaleDateString(currentTime).slice(0, 16),
    endTime: toLocaleDateString(OneHourLater).slice(0, 16),
  };
};
export const AllSlotTypes = [
  SlotType.Bicycle,
  SlotType.Bike,
  SlotType.Car,
  SlotType.Heavy,
];

export const formDefaultValuesSearchGarages: DefaultValues<FormTypeSearchGarages> =
  {
    pricePerHour: [0, 200] as [number, number],
    height: [0, 100] as [number, number],
    width: [0, 100] as [number, number],
    length: [0, 100] as [number, number],
    type: AllSlotTypes.sort(),
  };

export const FormProviderSearchGarage = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { startTime: currentTime, endTime: currentTimewithOneHour } =
    getCurrentTimewithOneHourLater();
  const method = useForm<FormTypeSearchGarages>({
    resolver: zodResolver(formSchemaSearchGarages),
    defaultValues: {
      ...formDefaultValuesSearchGarages,
      starttime: currentTime,
      endtime: currentTimewithOneHour,
    },
  });
  return <FormProvider {...method}>{children}</FormProvider>;
};
