import { LocationInfo, ViewState } from "@spotfinder2/util/types";
import { useState } from "react";
import { useMap } from "react-map-gl";
import { AutoComplete } from "../../atoms/AutoComplete";
import { useSearchLocation } from "@spotfinder2/util/hooks/location";
import { majorCitiesLocationInfo } from "@spotfinder2/util/constant";
import React from "react";
export const SearchPlacesBox = ({
  onLocationChange,
}: {
  onLocationChange?: (location: ViewState) => void;
}) => {
  const { current: map } = useMap();
  const { loading, setLoading, LocationInfo, searchText, setsearchText } =
    useSearchLocation();
  return (
    <AutoComplete<LocationInfo>
      options={LocationInfo?.length ? LocationInfo : majorCitiesLocationInfo}
      isOptionEqualToValue={(option, value) => {
        return option.placeName === value.placeName;
      }}
      noOptionsText={searchText ? "No Options" : "Try type something to search"}
      getOptionLabel={(option) => {
        return option.placeName;
      }}
      onInputChange={(_, v) => {
        setLoading(true);
        setsearchText(v);
      }}
      loading={loading}
      onChange={async (_, v) => {
        if (v) {
          console.log(JSON.stringify(v, null, 2));
          const { latLng, placeName } = v;
          console.log("Selected:", placeName);
          console.log("Latlng:", latLng);
          await map?.flyTo({
            center: { lat: latLng[0], lng: latLng[1] },
            zoom: 14,
            // essential: true,
          });
          if (onLocationChange) {
            onLocationChange({ latitude: latLng[0], longitude: latLng[1] });
          }
        }
      }}
    />
  );
};
