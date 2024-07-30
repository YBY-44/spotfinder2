import { useEffect, useState } from "react";
import { FormSchemaBookingSlot } from "@spotfinder2/forms/src/bookingSlot";
import { useWatch } from "react-hook-form";
import { differenceInMinutes } from "../date";
import { set } from "date-fns";
import { VALET_CHARGE_PER_METER } from "../constant";
export type TotalPriceType = {
  pricePerHour?: number;
};

export const useTotalPrice = ({ pricePerHour }: TotalPriceType) => {
  const { starttime, endtime, valet } = useWatch<FormSchemaBookingSlot>();
  const [parkingCharge, setparkingCharge] = useState(0);
  const [valetChargePickup, setvaletChargePickup] = useState(0);
  const [valetChargeDropoff, setvaletChargeDropoff] = useState(0);
  useEffect(() => {
    if (!starttime || !endtime) return;
    if (!pricePerHour) return;
    const differenceInMinutes_ = differenceInMinutes({
      startTime: starttime,
      endTime: endtime,
    });
    const differenceInHours = differenceInMinutes_ / (60 * 60 * 1000);
    const parkingCharge = Math.floor((pricePerHour || 0) * differenceInHours);
    setparkingCharge(parkingCharge);
  }, [pricePerHour, starttime, endtime]);
  useEffect(() => {
    const pickupCharge = valet?.pickUpInfo?.distance
      ? valet?.pickUpInfo?.distance * VALET_CHARGE_PER_METER
      : 0;
    const dropoffCharge = valet?.dropUpInfo?.distance
      ? valet?.dropUpInfo?.distance * VALET_CHARGE_PER_METER
      : 0;
    setvaletChargeDropoff(
      Math.floor(valet?.differentLocation ? dropoffCharge : pickupCharge),
    );
    setvaletChargePickup(Math.floor(pickupCharge));
  }, [valet]);
  return { parkingCharge, valetChargePickup, valetChargeDropoff };
};
