import { LatLng } from "../types";
import { useState, useEffect } from "react";
export const useMapboxDirections = (
  star?: Partial<LatLng> | null,
  end?: Partial<LatLng> | null,
) => {
  const [data, setData] = useState<[number, number][]>([]);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log("star:", star);
    console.log("end:", end);
    if (!star || !end) {
      setData([]);
      setDistance(null);
      return;
    }
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.mapbox.com/directions/v5/mapbox/driving/" +
            star.lng +
            "," +
            star.lat +
            ";" +
            end.lng +
            "," +
            end.lat +
            "?access_token=" +
            process.env.NEXT_PUBLIC_MAXBOX_TOKEN +
            "&steps=true&overview=simplified",
        );
        const data = await response.json();
        console.log("data_:", data);
        const coordinates =
          data?.routes[0]?.legs[0]?.steps?.map(
            (step: { maneuver: { location: [number, number] } }) => {
              return step.maneuver.location;
            },
          ) || [];
        setData(coordinates);
        setDistance(data?.routes[0]?.distance || 0);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [star, end]);
  return { data, distance, loading, error };
};
