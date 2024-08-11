import {
  GaragesDocument,
  MyCompanyQuery,
} from "@spotfinder2/network/src/gql/generated";
import { ShowData } from "./ShowData";
import { error } from "console";
import { useTakeStep } from "@spotfinder2/util/hooks/pagination";
import { useQuery } from "@apollo/client";
import { equal } from "assert";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "@mui/material";
import { GarageCard } from "./GaragesCount";
export const ListGarages = ({
  companyId,
}: {
  companyId: MyCompanyQuery["myCompany"]["id"];
}) => {
  const { skip, setSkip, take, setTake } = useTakeStep();
  const { data, error, loading } = useQuery(GaragesDocument, {
    variables: {
      skip,
      take,
      where: { companyId: { equals: companyId } },
    },
  });
  return (
    <ShowData
      error={error?.message}
      loading={loading}
      pagination={{
        skip,
        take,
        setSkip,
        setTake,
        resultCount: data?.garages.length,
        totalCount: data?.garagesCount.count,
      }}
      title={
        <div className="flex items-center gap-4 my-6">
          <div>Garages</div>
          <Link
            href="/new-garage"
            className="rounded-full border border-black p-0.5"
          >
            <IconPlus />
          </Link>
        </div>
      }
    >
      {data?.garages.map((garage) => {
        return <GarageCard key={garage.id} garage={garage} />;
      })}
    </ShowData>
  );
};
