import { useState, useEffect } from "react";
import { LocationInfo } from "@spotfinder2/util/types";
import { useDebounce } from "./async";
export const useSearchLocation = () => {
  const [searchText, setsearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [LocationInfo, setLocationInfo] = useState<LocationInfo[]>(() => {
    return [];
  });
  const debouncedSearchText = useDebounce(searchText, 400);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${debouncedSearchText}.json?access_token=${process.env.NEXT_PUBLIC_MAXBOX_TOKEN}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const filtered = data.features?.map((feature: any) => {
          return {
            placeName: feature.place_name,
            latLng: [feature.center[1], feature.center[0]],
          };
        });
        setLocationInfo(filtered);
      });
  }, [debouncedSearchText]);
  return { loading, setLoading, LocationInfo, searchText, setsearchText };
};
