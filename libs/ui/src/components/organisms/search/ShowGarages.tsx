import { SearchGaragesDocument } from "@spotfinder2/network/src/gql/generated";
import { GarageMarket } from "./GarageMarket";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useConvertFormToVaribles } from "@spotfinder2/forms/src/adapter/searchFormAdapter";
import { Panel } from "../map/Panel";
import { LoaderIcon } from "../../molecules/Loader";
import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

export const ShowGarages = () => {
  const [
    searchGarages,
    { loading: garagesLoading, data, previousData, error },
  ] = useLazyQuery(SearchGaragesDocument);
  const { variables } = useConvertFormToVaribles();

  useEffect(() => {
    if (variables) {
      // console.log(JSON.stringify(variables, null, 2));
      searchGarages({ variables });
    }
  }, [variables]);

  const garages = data?.searchGarages || previousData?.searchGarages || [];
  if (data?.searchGarages.length === 0) {
    return (
      <Panel
        position="center-center"
        className="bg-white/5 shadow shadow-white border border-black backdrop-blur-sm rounded-md"
      >
        <IconInfoCircle />
        <div className="flex items-center justify-center gap-2">
          No such kind of Spot in there in such time, try another location or
          time.
        </div>
      </Panel>
    );
  }

  return (
    <>
      {garagesLoading ? (
        <Panel position="center-bottom">
          <LoaderIcon />
        </Panel>
      ) : null}
      {garages.map((garages) => {
        return <GarageMarket key={garages.id} marker={garages}></GarageMarket>;
      })}
    </>
  );
};
