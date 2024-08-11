"use client";
import {
  CreateBookingInput,
  SearchGaragesQuery,
  SlotType,
} from "@spotfinder2/network/src/gql/generated";
import { FormSchemaBookingSlot } from "../../../../forms/src/bookingSlot";
import { useFormContext } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Badge } from "@spotfinder2/ui/src/components/atoms/Badge";
import { Form } from "../atoms/Form";
import { AutoImageChanger } from "./AutoImageChanger";
import { DateRangeBookingInfo } from "../molecules/DateRangeBookingInfo";
import { HtmlLabel } from "../atoms/Label";
import { Controller } from "react-hook-form";
import { RadioGroup, Radio } from "@headlessui/react";
import { IconTypes } from "../molecules/IconTypes";
import { FormError } from "../atoms/FormError";
import { Button } from "../atoms/Button";
import { useEffect, useState } from "react";
import { HtmlInput } from "../atoms/Input";
import { toLocaleDateString } from "@spotfinder2/util/date";
import { useTotalPrice } from "@spotfinder2/util/hooks/price";
import { Cost } from "../molecules/Cost";
import { useSession } from "next-auth/react";
import { TotalPrice } from "@spotfinder2/util/types";
import { loadStripe } from "@stripe/stripe-js";
import { ManageValet } from "./ManageValet";
export const BookSlotPopup = ({
  garage,
}: {
  garage: SearchGaragesQuery["searchGarages"][0];
}) => {
  const session = useSession();
  const uid = session.data?.user?.uid;
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext<FormSchemaBookingSlot>();
  const { starttime, endtime, type, valet, vehicleNumber, phoneNumber } =
    useWatch<FormSchemaBookingSlot>();
  const pricePerHour = garage.availableSlots.find(
    (slot) => slot.type === type,
  )?.pricePerHour;
  const totalPriceObject = useTotalPrice({
    pricePerHour: pricePerHour || undefined,
  });
  const TotalPrice =
    totalPriceObject.parkingCharge +
    totalPriceObject.valetChargeDropoff +
    totalPriceObject.valetChargePickup;
  useEffect(() => {
    console.log("Valet state changed:", valet);
  }, [valet]);
  const [booking, setBooking] = useState(false);
  return (
    <div className="flex gap-2 text-left border-t-2 border-white bg-white/50 backdrop-blur-sm rounded">
      <Form
        onSubmit={handleSubmit(async (data) => {
          console.log("formData: ", data);
          if (!uid) {
            alert("Please login then you can book it.");
            return;
          }
          const bookingData = {
            phoneNumber: data.phoneNumber,
            customerId: uid,
            endTime: data.endtime,
            startTime: data.starttime,
            type: data.type,
            garageId: garage.id,
            vehicleNumber: data.vehicleNumber,
            totalPrice: TotalPrice,
            pricePerHour,
            ...(data.valet?.pickUpInfo && data.valet?.dropUpInfo
              ? {
                  valetAssignment: {
                    pickupLat: data.valet.pickUpInfo.lat,
                    pickupLng: data.valet.pickUpInfo.lng,
                    returnLat: data.valet.dropUpInfo.lat,
                    returnLng: data.valet.dropUpInfo.lng,
                  },
                }
              : null),
          };
          setBooking(true);
          const res = await createBookingSession(
            uid!,
            totalPriceObject,
            bookingData,
          );
          setBooking(false);
        })}
      >
        <div className="flex items-start gap-2">
          <div className="mb-2 text-lg font-bold flex">
            {garage.displayName}
            {garage.verification?.verified ? (
              <Badge variant="green" size="sm">
                Verified
              </Badge>
            ) : (
              <Badge variant="gray" size="sm">
                Not Verified
              </Badge>
            )}
          </div>
        </div>
        <div className="mb-2 font-extraight text-xl">
          {garage.address?.address}
        </div>
        <AutoImageChanger
          images={garage.images || []}
          durationPerImage={10000}
          aspectRatio="aspect-video"
          noAutoChange
        />
        <DateRangeBookingInfo startTime={starttime} endTime={endtime} />
        <div className="flex flex-wrap gap-2 mt-2">
          <HtmlLabel title="SpotType">
            <Controller
              name="type"
              control={control}
              defaultValue={SlotType.Car}
              render={({ field: { onChange, value } }) => {
                return (
                  <RadioGroup
                    value={value}
                    onChange={onChange}
                    className="flex w-full gap-2"
                  >
                    {garage.availableSlots.map((slot) => {
                      return (
                        <div
                          key={slot.type}
                          className="flex flex-wrap items-center gap-2 bg-white"
                        >
                          <Radio key={slot.type} value={slot.type}>
                            {({ checked }) => (
                              <div
                                className={
                                  "cursor-default border-2 p-2 " +
                                  (checked
                                    ? " border-primary-500 shadow-md"
                                    : " border-gray-200")
                                }
                              >
                                <div className="flex items-center gap-2">
                                  {slot?.type ? IconTypes[slot.type] : null}
                                  <div>
                                    <span className="text-lg font-bold">
                                      {slot.pricePerHour}
                                    </span>
                                    /hr
                                  </div>
                                </div>

                                <div className="text-gray-600">
                                  {slot.count} open
                                </div>
                              </div>
                            )}
                          </Radio>
                        </div>
                      );
                    })}
                  </RadioGroup>
                );
              }}
            />
          </HtmlLabel>
        </div>
        {!type ? <FormError error="Set type" /> : null}
        <HtmlLabel title="StartParking" error={errors.starttime?.message}>
          <HtmlInput
            type="datetime-local"
            className="w-full p-2 text-lg font-light"
            min={toLocaleDateString(new Date())}
            {...register("starttime")}
          />
        </HtmlLabel>
        <HtmlLabel title="LeavingParking" error={errors.starttime?.message}>
          <HtmlInput
            type="datetime-local"
            className="w-full p-2 text-lg font-light"
            min={toLocaleDateString(new Date())}
            {...register("endtime")}
          />
        </HtmlLabel>
        <div className="mt-2 space-y-2">
          <HtmlLabel
            title="Vehicle Number"
            error={errors.vehicleNumber?.message}
          >
            <HtmlInput placeholder="********" {...register("vehicleNumber")} />
          </HtmlLabel>
          <HtmlLabel title="Phone Number" error={errors.phoneNumber?.message}>
            <HtmlInput placeholder="0123456789" {...register("phoneNumber")} />
          </HtmlLabel>
        </div>
        <ManageValet garage={garage} />
        {totalPriceObject ? (
          <div className="mt-4">
            <Cost
              title="Parking"
              price={totalPriceObject.parkingCharge.toFixed(2)}
            />
            <Cost
              title="Valet Pickup"
              price={totalPriceObject.valetChargePickup.toFixed(2)}
            />
            <Cost
              title="Valet Dropoff"
              price={totalPriceObject.valetChargeDropoff.toFixed(2)}
            />
            <Cost title="Total" price={TotalPrice.toFixed(2)} />
          </div>
        ) : null}
        <Button loading={booking} type="submit" className="w-full mt-2">
          BookNow
        </Button>
      </Form>
    </div>
  );
};

export const createBookingSession = async (
  uid: string,
  totalPriceObject: TotalPrice,
  bookingData: CreateBookingInput,
) => {
  console.log(totalPriceObject);
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/stripe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      totalPriceObject,
      uid,
      bookingData,
    }),
  });
  const checkoutSession = await response.json();
  console.log("checkoutSession: ", checkoutSession);
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = await loadStripe(publishableKey || "");
  const result = await stripePromise?.redirectToCheckout({
    sessionId: checkoutSession.sessionId,
  });
  return result;
};
