import {
  SearchGaragesQuery,
  SearchGaragesQueryVariables,
} from "@spotfinder2/network/src/gql/generated";
import { FormTypeSearchGarages } from "../searchGarages";
import { useEffect, useState } from "react";
import {
  FieldNamesMarkedBoolean,
  set,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useDebounce } from "@spotfinder2/util/hooks/async";
import { intFilter } from "./util";
type FormData = Partial<
  Pick<
    FormTypeSearchGarages,
    | "endtime"
    | "starttime"
    | "height"
    | "length"
    | "width"
    | "pricePerHour"
    | "type"
    | "locationFilter"
    | "skip"
    | "take"
  >
>;

export const useConvertFormToVaribles = () => {
  const [variables, setvariables] =
    useState<SearchGaragesQueryVariables | null>(null);
  const {
    formState: { dirtyFields },
    watch,
  } = useFormContext<FormTypeSearchGarages>();
  const formData = watch();
  const DeboncedData = useDebounce(formData, 500);
  useEffect(() => {
    const {
      starttime,
      endtime,
      locationFilter: locationBonds,
      length,
      width,
      height,
      pricePerHour,
      type,
      skip,
      take,
    } = DeboncedData;
    const dateFilter: SearchGaragesQueryVariables["dateFilter"] = {
      start: starttime,
      end: endtime,
    };

    const locationFilter: SearchGaragesQueryVariables["locationFilter"] =
      locationBonds;

    const slotsFilter = createSlotsFilter(dirtyFields, {
      length,
      width,
      height,
      pricePerHour,
      type,
    });

    const garageFilter = createGaragesFilter(dirtyFields, {
      skip,
      take,
    });
    setvariables({
      dateFilter,
      locationFilter,
      ...(Object.keys(slotsFilter).length && { slotsFilter }),
      ...(Object.keys(garageFilter).length && { garageFilter }),
    });
  }, [DeboncedData]);
  return { variables };
};

export const createSlotsFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarages>,
  formData: FormData,
) => {
  const length = dirtyFields.length && intFilter(formData.length);
  const width = dirtyFields.width && intFilter(formData.width);
  const height = dirtyFields.height && intFilter(formData.height);
  const pricePerHour =
    dirtyFields.pricePerHour && intFilter(formData.pricePerHour);
  const type = dirtyFields.type && { in: formData.type };
  return {
    ...(length && { length }),
    ...(width && { width }),
    ...(height && { height }),
    ...(pricePerHour && { pricePerHour }),
    ...(type && { type }),
  };
};

export const createGaragesFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarages>,
  formData: FormData,
) => {
  const skip = (dirtyFields.skip && formData.skip) || 0;
  const take = (dirtyFields.take && formData.take) || 10;
  return {
    ...(skip && { skip }),
    ...(take && { take }),
  };
};
