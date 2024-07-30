import { SlotType } from "@spotfinder2/network/src/gql/generated";
import { z } from "zod";
import { isStartTimeValid, isEndTimeValid } from "./adapter/util/index";
import { DefaultValues, FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
export const locationInfo = z.object({
  lat: z.number(),
  lng: z.number(),
  distance: z.number().optional(),
  notes: z.string().optional(),
});

export const formSchemaVelet = z.object({
  pickUpInfo: locationInfo,
  dropUpInfo: locationInfo,
  differentLocation: z.boolean().optional(),
});

export const formSchemaBookingSlot = z.object({
  starttime: z.string(),
  endtime: z.string(),
  vehicleNumber: z.string().min(1, { message: "Vehicle number is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  type: z.nativeEnum(SlotType, {
    required_error: "Slot type is required",
  }),
  valet: formSchemaVelet.optional(),
});

export type FormSchemaBookingSlot = z.infer<typeof formSchemaBookingSlot>;

formSchemaBookingSlot
  .refine(
    ({ starttime, endtime }) => {
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

export const useFormBookSlot = ({
  defaultValues,
}: {
  defaultValues: DefaultValues<FormSchemaBookingSlot>;
}) => {
  return useForm<FormSchemaBookingSlot>({
    resolver: zodResolver(formSchemaBookingSlot),
    defaultValues,
  });
};

export const FormProviderBookSlot = ({
  children,
  defaultValues,
}: {
  children: ReactNode;
  defaultValues: DefaultValues<FormSchemaBookingSlot>;
}) => {
  const method = useFormBookSlot({ defaultValues });
  return <FormProvider {...method}>{children}</FormProvider>;
};
