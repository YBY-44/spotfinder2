"use client";
import { Dialog } from "@spotfinder2/ui/src/components/atoms/Dialog";
import { Button } from "@spotfinder2/ui/src/components/atoms/Button";
import { useFormCreateValet } from "@spotfinder2/forms/src/createValet";
import React, { useState } from "react";
import { ImagePerview } from "./ImagePreview";
import { Controller } from "react-hook-form";
import { HtmlInput } from "../atoms/Input";
import { Form } from "@spotfinder2/ui/src/components/atoms/Form";
import { HtmlLabel } from "../atoms/Label";
import { useCloudinaryUpload } from "@spotfinder2/util/hooks/cloudinary";
import { useMutation } from "@apollo/client";
import {
  CreateValetDocument,
  namedOperations,
} from "@spotfinder2/network/src/gql/generated";
import { toast } from "../molecules/Toast";
export const AddValet = () => {
  const {
    register,
    resetField,
    watch,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormCreateValet();
  const [open, setOpen] = useState(false);
  const { uid, displayName, licenceID, image } = watch();
  const { uploading, upload } = useCloudinaryUpload();
  const [createValet, { data, error, loading }] = useMutation(
    CreateValetDocument,
    {
      onCompleted: () => {
        reset();
        toast.success("Valet created successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );
  return (
    <div className="pt-10">
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Create Valet
      </Button>
      <Dialog
        widthClassName="max-w-xl"
        open={open}
        setOpen={setOpen}
        title={"Create Valet"}
      >
        <Form
          onSubmit={handleSubmit(
            async ({ uid, displayName, licenceID, image }) => {
              const uploadingImage = await upload(image);
              if (!uploadingImage) {
                throw new Error("Uploading image failed");
              }
              return await createValet({
                variables: {
                  createValetInput: {
                    uid: uid,
                    displayName: displayName,
                    licenceID: licenceID,
                    image: uploadingImage[0],
                  },
                },
              });
            },
          )}
        >
          <HtmlLabel title={"Uid"} error={errors.uid?.message}>
            <HtmlInput placeholder="Uid of the valet" {...register("uid")} />
          </HtmlLabel>
          <HtmlLabel title="Valet Name">
            <HtmlInput
              placeholder="Uid of the valet"
              {...register("displayName")}
            />
          </HtmlLabel>
          <HtmlLabel title="Licence ID">
            <HtmlInput
              placeholder="Uid of the valet"
              {...register("licenceID")}
            />
          </HtmlLabel>
          <HtmlLabel title="Photo">
            <ImagePerview
              srcs={image}
              clearImage={() => {
                resetField("image");
              }}
            >
              <Controller
                control={control}
                name={"image"}
                render={({ field }) => {
                  return (
                    <HtmlInput
                      placeholder="No file chosen"
                      type="file"
                      accept="image/*"
                      multiple={true}
                      onChange={(e) => {
                        field.onChange(e?.target?.files);
                      }}
                    />
                  );
                }}
              />
            </ImagePerview>
          </HtmlLabel>
          <Button loading={uploading} type="submit">
            Create Valet
          </Button>
        </Form>
      </Dialog>
    </div>
  );
};
