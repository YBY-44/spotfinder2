import { useTakeStep } from "@spotfinder2/util/hooks/pagination";
import { CompanyValetsDocument } from "@spotfinder2/network/src/gql/generated";
import { useQuery } from "@apollo/client";
import { ShowData } from "./ShowData";
import { ValetCard } from "../organisms/ValetCard";
export const ListValets = () => {
  const { take, skip, setSkip, setTake } = useTakeStep();
  const { data, loading } = useQuery(CompanyValetsDocument);
  return (
    <ShowData
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.companyValets.length,
        totalCount: data?.companyValetsTotal,
      }}
      loading={loading}
      title="Valets"
    >
      {" "}
      {data?.companyValets.map((valet) => {
        return <ValetCard key={valet.uid} valet={valet} />;
      })}
    </ShowData>
  );
};
