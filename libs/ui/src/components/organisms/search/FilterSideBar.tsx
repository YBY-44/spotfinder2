import { useFormContext, Controller } from "react-hook-form";
import { FormTypeSearchGarages } from "@spotfinder2/forms/src/searchGarages";
import { useState } from "react";
import { Button } from "@spotfinder2/ui/src/components/atoms/Button";
import { IconFilter } from "@tabler/icons-react";
import { DotPlugs } from "@spotfinder2/ui/src/components/atoms/Dot";
import { Sidebar } from "../Sidebar";
import { RangeSlider } from "../../molecules/RangeSlider";
import { ToggleButtonGroup, ToggleButton } from "../../molecules/Toggle";
import { FilterHeading } from "../../molecules/HeaderFilter";
import { IconTypes } from "../../molecules/IconTypes";
import { formDefaultValuesSearchGarages } from "@spotfinder2/forms/src/searchGarages";
export const FilterSideBar = () => {
  const [open, setOpen] = useState(false);
  const {
    control,
    reset,
    getValues,
    formState: { dirtyFields },
  } = useFormContext<FormTypeSearchGarages>();
  return (
    <>
      <Button
        size="sm"
        varient="text"
        onClick={() => {
          setOpen(true);
        }}
        className="hover:bg-white/50"
      >
        <IconFilter className="stroke-1.5 text-black" />
        {Object.values(dirtyFields).length ? <DotPlugs /> : null}
      </Button>
      <Sidebar open={open} setOpen={setOpen} blur={false}>
        <div className="flex flex-col items-start gap-3">
          <Controller
            name="type"
            control={control}
            render={({
              field: { value = [], onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="flex flex-col">
                  <FilterHeading dirty={isDirty} title="Vehicle type" />
                  <ToggleButtonGroup
                    value={value}
                    aria-label="text formatting"
                    onChange={(_, value) => {
                      onChange(value.sort());
                    }}
                  >
                    {defaultValues?.type?.map((val) => {
                      if (!val) return null;
                      return (
                        <ToggleButton
                          key={val}
                          value={val}
                          selected={value.includes(val)}
                        >
                          {IconTypes[val]}
                        </ToggleButton>
                      );
                    })}
                  </ToggleButtonGroup>
                </div>
              );
            }}
          />
          <Controller
            name="pricePerHour"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Price per hour" />
                  <RangeSlider
                    min={defaultValues?.pricePerHour?.[0]}
                    max={defaultValues?.pricePerHour?.[1]}
                    // max={200}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) => {
                      return "$ " + sliderValue.toLocaleString();
                    }}
                    step={1}
                  />
                </div>
              );
            }}
          />
          <Controller
            name="width"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Spot Width" />
                  <RangeSlider
                    min={defaultValues?.width?.[0]}
                    max={defaultValues?.width?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) => {
                      return sliderValue.toLocaleString() + " ft";
                    }}
                    step={1}
                  />
                </div>
              );
            }}
          />
          <Controller
            name="height"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Spot Height" />
                  <RangeSlider
                    min={defaultValues?.height?.[0]}
                    max={defaultValues?.height?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) => {
                      return sliderValue.toLocaleString() + " ft";
                    }}
                    step={1}
                  />
                </div>
              );
            }}
          />
          <Controller
            name="length"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Spot Length" />
                  <RangeSlider
                    min={defaultValues?.height?.[0]}
                    max={defaultValues?.height?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) => {
                      return sliderValue.toLocaleString() + " ft";
                    }}
                    step={1}
                  />
                </div>
              );
            }}
          />
          <Button
            onClick={() => {
              reset({ ...getValues(), ...formDefaultValuesSearchGarages });
            }}
            disabled={!Object.values(dirtyFields).length}
          >
            Reset
          </Button>
        </div>
      </Sidebar>
    </>
  );
};
