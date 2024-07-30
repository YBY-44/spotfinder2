"use client";
import React, { use, useCallback } from "react";
import { Map } from "../organisms/map/Map";
import { Panel } from "../organisms/map/Panel";
import { InitialZoomControls } from "../organisms/map/ZoomControls";
import { ViewStateChangeEvent } from "react-map-gl";
import { initialViewStates } from "../../../../util/constant";
import { SearchPlacesBox } from "../organisms/map/SearchPlacesBox";
import { FormTypeSearchGarages } from "@spotfinder2/forms/src/searchGarages";
import { useFormContext } from "react-hook-form";
import { IconArrowDown } from "@tabler/icons-react";
import { HtmlInput } from "../atoms/Input";
import { toLocaleDateString } from "@spotfinder2/util/date";
import { IconType } from "../molecules/IconTypes";
import { ShowGarages } from "../organisms/search/ShowGarages";
import { FilterSideBar } from "../organisms/search/FilterSideBar";
export const SearchPage = () => {
  const { register, setValue, watch } = useFormContext<FormTypeSearchGarages>();
  const formData = watch();
  console.log("formData", formData);
  const handleMapChange = useCallback(
    (target: ViewStateChangeEvent["target"]) => {
      const bounds = target.getBounds();
      console.log(bounds);
      const locationFilter = {
        ne_lat: bounds?.getNorthEast().lat || 0,
        ne_lng: bounds?.getNorthEast().lng || 0,
        sw_lat: bounds?.getSouthWest().lat || 0,
        sw_lng: bounds?.getSouthWest().lng || 0,
      };
      console.log(locationFilter);
      setValue("locationFilter", { ...locationFilter });
    },
    [setValue],
  );
  return (
    <Map
      onLoad={(e) => {
        handleMapChange(e.target);
      }}
      onDragEnd={(e) => {
        handleMapChange(e.target);
      }}
      onZoomEnd={(e) => {
        handleMapChange(e.target);
      }}
      initialViewState={initialViewStates}
    >
      <ShowGarages />
      <Panel position="left-top">
        <div className="flex flex-col items-stretch">
          <SearchPlacesBox />
          <div className="flex pl-1 relative flex-col mt-1 bg-white/40 items-center gap-1 backdrop-blur-sm">
            <div className="absolute left-[1px] top-1/2 -translate-y-1/2 ed">
              <IconArrowDown className="p-1" />
            </div>
            <div className="flex gap-1 items-center">
              <IconType time={formData.starttime} className="" />
              <HtmlInput
                type="datetime-local"
                className="w-full p-2 text-lg font-light border-0"
                min={toLocaleDateString(new Date()).slice(0, 16)}
                {...register("starttime")}
              />
            </div>

            <div className="flex gap-1 items-center">
              <IconType time={formData.endtime} className="" />
              <HtmlInput
                min={toLocaleDateString(new Date()).slice(0, 16)}
                className="w-full p-2 text-lg font-light border-0"
                type="datetime-local"
                {...register("endtime")}
              />
            </div>
          </div>
        </div>
      </Panel>
      <Panel position="right-center">
        <InitialZoomControls />
      </Panel>
      <Panel position="right-top">
        <FilterSideBar />
      </Panel>
    </Map>
  );
};
