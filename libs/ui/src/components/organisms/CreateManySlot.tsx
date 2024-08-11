import { useFormCreateManySlot } from "@spotfinder2/forms/src/creatManySlot";
import {
  CreateSlotsDocument,
  namedOperations,
} from "@spotfinder2/network/src/gql/generated";
import { useMutation } from "@apollo/client";
import { Button } from "@spotfinder2/ui/src/components/atoms/Button";
import { useState } from "react";
import { Dialog } from "../atoms/Dialog";
import { Form } from "../atoms/Form";
import { HtmlSelect } from "../atoms/HtmlSelect";
import { HtmlLabel } from "../atoms/Label";
import { SlotType } from "@spotfinder2/network/src/gql/generated";
import { HtmlInput } from "../atoms/Input";
import { toast } from "../molecules/Toast";
export const CreateManySlotDialog = ({
  garageId,
  displayName,
}: {
  garageId: number;
  displayName: string;
}) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormCreateManySlot();
  const [createManySlot, { loading, error, data }] = useMutation(
    CreateSlotsDocument,
    {
      awaitRefetchQueries: true,
      refetchQueries: [namedOperations.Query.Garages],
      onCompleted: (data, clientOptions) => {
        setOpen(false);
        toast.success("Slots Created Successfully");
      },
      onError: (error) => {
        toast.error("Error Creating Slots, " + error.message);
      },
    },
  );
  return (
    <>
      <Button
        varient="text"
        size="none"
        onClick={() => {
          setOpen(true);
        }}
        className="w-16 h-10 border-2 group border-primary"
      >
        <div className="text-lg transition-transform duration-300 group-hover:scale-150">
          +
        </div>
      </Button>
      <Dialog
        open={open}
        setOpen={setOpen}
        title={"Create Slots - " + displayName}
      >
        <Form
          onSubmit={handleSubmit(async (data) => {
            console.log(data);
            await createManySlot({
              variables: {
                count: data.count,
                createSlotInput: {
                  garageId,
                  type: data.type,
                  pricePerHour: data.pricePerHour,
                  length: data.length,
                  width: data.width,
                  height: data.height,
                },
              },
            });
          })}
        >
          <div className="grid grid-cols-2 gap-2">
            <HtmlLabel title="Slot Type" error={errors.type?.message}>
              <HtmlSelect placeholder="Slot Type" {...register("type")}>
                {Object.values(SlotType).map((typeName) => {
                  return (
                    <option key={typeName} value={typeName}>
                      {typeName}
                    </option>
                  );
                })}
              </HtmlSelect>
            </HtmlLabel>
            <HtmlLabel
              title="Price Per Hour"
              optional
              error={errors.pricePerHour?.message}
            >
              <HtmlInput
                type="number"
                placeholder="Price Per Hour"
                {...register(`pricePerHour`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel
              title="Number Of Slots"
              optional
              error={errors.count?.message}
            >
              <HtmlInput
                type="number"
                placeholder="Enter the Slot Count"
                {...register(`count`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>

            <HtmlLabel
              title="Spot Length"
              optional
              error={errors.length?.message}
            >
              <HtmlInput
                type="number"
                placeholder="Enter the Slot Length"
                {...register(`length`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>

            <HtmlLabel
              title="Spot Width"
              optional
              error={errors.width?.message}
            >
              <HtmlInput
                type="number"
                placeholder="Enter the Slot Width"
                {...register(`width`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>

            <HtmlLabel
              title="Spot Height"
              optional
              error={errors.height?.message}
            >
              <HtmlInput
                type="number"
                placeholder="Enter the Slot Height"
                {...register(`height`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>

            <Button type="submit">Create Slot</Button>
          </div>
        </Form>
      </Dialog>
    </>
  );
};
