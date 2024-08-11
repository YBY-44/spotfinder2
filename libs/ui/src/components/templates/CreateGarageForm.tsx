"use client";
import {
  FormProviderCreateGarage,
  FormTypeCreateGarage,
} from "@spotfinder2/forms/src/createGarage";
import {
  CreateGarageDocument,
  namedOperations,
} from "@spotfinder2/network/src/gql/generated";
import { useMutation } from "@apollo/client";
import { HtmlLabel } from "../atoms/Label";
import { HtmlInput } from "../atoms/Input";
import { Form } from "../atoms/Form";
import { Button } from "../atoms/Button";
import { HtmlTextArea } from "../atoms/HtmlTextArea";
import { ImagePerview } from "../organisms/ImagePreview";
import { useCloudinaryUpload } from "@spotfinder2/util/hooks/cloudinary";
import { Controller } from "react-hook-form";
import { Map } from "../organisms/map/Map";
import { initialViewStates } from "@spotfinder2/util/constant";
import { ViewState } from "@spotfinder2/util/types";
import { Panel } from "../organisms/map/Panel";
import { SearchPlacesBox } from "../organisms/map/SearchPlacesBox";
import {
  InitialZoomControls,
  VCZoomControls,
} from "../organisms/map/ZoomControls";
import { useFormContext } from "react-hook-form";
import { AddSlots, GarageMapMarker } from "../organisms/CreateGarageComponment";
import { toast } from "../molecules/Toast";
const CreateGarageForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
    resetField,
    watch,
  } = useFormContext<FormTypeCreateGarage>();
  const { images } = watch();
  const { uploading, upload } = useCloudinaryUpload();
  const [createGarage, { data, error, loading }] = useMutation(
    CreateGarageDocument,
    {
      refetchQueries: [namedOperations.Query.MyCompany],
      onCompleted: () => {
        reset();
        toast.success("Garage created successfully");
      },
      onError: (error, clientOptions) => {
        toast.error(error.message);
      },
    },
  );
  return (
    <div className="grid md:grid-cols-2 gap-2 mt-2">
      <div>
        <Form
          onSubmit={handleSubmit(
            async ({
              images,
              disPlayName,
              description,
              location,
              slotTypes,
            }) => {
              const uploadingImage = await upload(images);
              if (!uploadingImage) {
                throw Error("Failed to upload image");
              }
              return await createGarage({
                variables: {
                  createGarageInput: {
                    displayName: disPlayName,
                    description: description,
                    Address: location,
                    Slots: slotTypes,
                    images: uploadingImage,
                  },
                },
              });
            },
          )}
        >
          <HtmlLabel error={errors.disPlayName?.message} title="Display Name">
            <HtmlInput {...register("disPlayName")} placeholder="Garage name" />
          </HtmlLabel>
          <HtmlLabel error={errors.description?.message} title="Description">
            <HtmlTextArea
              cols={5}
              {...register("description")}
              placeholder="Describe..."
            />
          </HtmlLabel>
          <HtmlLabel error={errors.location?.address?.message} title="Address">
            <HtmlTextArea
              cols={5}
              {...register("location.address")}
              placeholder="Input your location there"
            />
          </HtmlLabel>
          <ImagePerview
            srcs={images}
            clearImage={() => {
              return resetField("images");
            }}
          >
            <Controller
              control={control}
              name={"images"}
              render={({ field }) => {
                return (
                  <HtmlInput
                    type="file"
                    multiple={true}
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e?.target?.files);
                    }}
                    className="border-0"
                  />
                );
              }}
            />
          </ImagePerview>
          <AddSlots />
          <Button loading={uploading || loading} type="submit">
            Create Now
          </Button>
        </Form>
      </div>
      <Map
        initialViewState={initialViewStates}
        onLoad={(e) => {
          const { lat, lng } = e.target.getCenter();
          setValue("location.lat", lat || 0);
          setValue("location.lng", lng || 0);
        }}
      >
        <GarageMapMarker />
        <Panel position="left-top">
          <SearchPlacesBox
            onLocationChange={(location: ViewState) => {
              setValue("location.lat", location.latitude);
              setValue("location.lng", location.longitude);
            }}
          />
          <InitialZoomControls>
            <VCZoomControls
              onClick={(latLng) => {
                const lat = parseFloat(latLng.lat.toFixed(8));
                const lng = parseFloat(latLng.lng.toFixed(8));
                setValue("location.lat", lat, {
                  shouldValidate: true,
                });
                setValue("location.lng", lng, {
                  shouldValidate: true,
                });
              }}
            />
          </InitialZoomControls>
        </Panel>
      </Map>
    </div>
  );
};

export const CreateGarage = () => {
  return (
    <FormProviderCreateGarage>
      <CreateGarageForm />
    </FormProviderCreateGarage>
  );
};
