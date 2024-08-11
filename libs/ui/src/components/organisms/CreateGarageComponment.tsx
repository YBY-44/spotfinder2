import { FormTypeCreateGarage } from "@spotfinder2/forms/src/createGarage";
import { useWatch, useFormContext, useFieldArray } from "react-hook-form";
import { ParkingIcon } from "../atoms/Parkingicon";
import { Marker } from "../organisms/map/MapMarker";
import { initialViewStates } from "@spotfinder2/util/constant";
import { Accordion } from "../atoms/Accordion";
import { Button } from "../atoms/Button";
import { IconPlus } from "@tabler/icons-react";
import { SlotType } from "@spotfinder2/network/src/gql/generated";
import { HtmlSelect } from "../atoms/HtmlSelect";
import { HtmlLabel } from "../atoms/Label";
import { HtmlInput } from "../atoms/Input";
export const GarageMapMarker = () => {
  const { location } = useWatch<FormTypeCreateGarage>();
  const { setValue } = useFormContext<FormTypeCreateGarage>();
  const initialLocation = location || initialViewStates;
  //   useEffect(() => {
  //     if (initialLocation) {
  //       const { latitude, longitude } = initialLocation;
  //       setValue('location', { lat: latitude, lng: longitude, address: '' });
  //     }
  //   }, [initialLocation]);
  return (
    <Marker
      pitchAlignment="auto"
      longitude={location?.lng || 0}
      latitude={location?.lat || 0}
      draggable
      onDragEnd={({ lngLat }) => {
        const { lng, lat } = lngLat;
        setValue("location.lat", lat || 0);
        setValue("location.lng", lng || 0);
      }}
    >
      <ParkingIcon />
    </Marker>
  );
};

export const AddSlots = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormTypeCreateGarage>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "slotTypes",
  });
  const { slotTypes } = useWatch<FormTypeCreateGarage>();
  return (
    <div>
      {fields.map((field, index) => {
        return (
          <Accordion
            key={field.id}
            title={
              <div>
                <div>
                  {slotTypes?.[index]?.type} x {slotTypes?.[index]?.count}
                </div>
              </div>
            }
          >
            <div className="flex justify-end my-2">
              <Button
                varient="text"
                size="none"
                className="text-xs text-gray-800 underline underline-offset-2"
                onClick={() => {
                  remove(index);
                }}
                // onMouseEnter={()=>{
                //     setHovered(field.id);
                // }}
                // onMouseLeave={()=>{
                //     setHovered(null)
                // }}
                // onFocus={()=>{setHovered(item.id)}}
                // onBlur={()=>{setHovered(null)}}
              >
                remove slot type
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <HtmlLabel
                title="Vehicle Type"
                error={errors.slotTypes?.[index]?.type?.toString()}
              >
                <HtmlSelect
                  placeholder="vehicle Type"
                  {...register(`slotTypes.${index}.type`)}
                >
                  {Object.values(SlotType).map((type) => {
                    return (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    );
                  })}
                </HtmlSelect>
              </HtmlLabel>
              <HtmlLabel
                title="Price Per Hour"
                optional
                error={errors.slotTypes?.[index]?.pricePerHour?.message}
              >
                <HtmlInput
                  type="number"
                  placeholder="Price Per Hour"
                  {...register(`slotTypes.${index}.pricePerHour`, {
                    valueAsNumber: true,
                  })}
                />
              </HtmlLabel>
              <HtmlLabel
                title="Number Of Slots"
                optional
                error={errors.slotTypes?.[index]?.count?.message}
              >
                <HtmlInput
                  type="number"
                  placeholder="Enter the Slot Count"
                  {...register(`slotTypes.${index}.count`, {
                    valueAsNumber: true,
                  })}
                />
              </HtmlLabel>

              <HtmlLabel
                title="Spot Length"
                optional
                error={errors.slotTypes?.[index]?.length?.message}
              >
                <HtmlInput
                  type="number"
                  placeholder="Enter the Slot Length"
                  {...register(`slotTypes.${index}.length`, {
                    valueAsNumber: true,
                  })}
                />
              </HtmlLabel>

              <HtmlLabel
                title="Spot Width"
                optional
                error={errors.slotTypes?.[index]?.width?.message}
              >
                <HtmlInput
                  type="number"
                  placeholder="Enter the Slot Width"
                  {...register(`slotTypes.${index}.width`, {
                    valueAsNumber: true,
                  })}
                />
              </HtmlLabel>

              <HtmlLabel
                title="Spot Height"
                optional
                error={errors.slotTypes?.[index]?.height?.message}
              >
                <HtmlInput
                  type="number"
                  placeholder="Enter the Slot Height"
                  {...register(`slotTypes.${index}.height`, {
                    valueAsNumber: true,
                  })}
                />
              </HtmlLabel>
            </div>
          </Accordion>
        );
      })}
      <Button
        className="flex items-center justify-center w-full py-2 text-xs border border-dashed"
        varient="text"
        onClick={() => {
          append({
            length: 10,
            width: 10,
            height: 10,
            pricePerHour: 10,
            count: 5,
            type: SlotType.Car,
          });
        }}
      >
        <IconPlus className="w-4 h-4" /> Add slots
      </Button>
    </div>
  );
};
