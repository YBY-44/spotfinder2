"use client";
import { useTakeStep } from "@spotfinder2/util/hooks/pagination";
import { useQuery } from "@apollo/client";
import { GaragesDocument } from "@spotfinder2/network/src/gql/generated";
import { ShowData } from "@spotfinder2/ui/src/components/organisms/ShowData";
import { GarageAdminCard } from "@spotfinder2/ui/src/components/organisms/GarageAdminCard";
import { CreateVerificationButton } from "@spotfinder2/ui/src/components/organisms/admin/CreateVerificationButton";
import { RemoveVerificationButton } from "@spotfinder2/ui/src/components/organisms/admin//RemoveVerificationButton";
export const AdminHome = () => {
  return <ShowGarages />;
};

export const ShowGarages = () => {
  const { setSkip, setTake, skip, take } = useTakeStep();
  const { data, loading, error } = useQuery(GaragesDocument, {
    variables: {
      skip,
      take,
    },
  });

  return (
    <ShowData
      error={error?.message}
      title={"Garages"}
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.garages.length || 0,
        totalCount: data?.garagesCount.count || 0,
      }}
    >
      {data?.garages.map((garage) => {
        return (
          <GarageAdminCard key={garage.id} garage={garage}>
            <div className="justify-end flex">
              {!garage.verification?.verified ? (
                <CreateVerificationButton garage={garage.id} />
              ) : (
                <RemoveVerificationButton garage={garage.id} />
              )}
            </div>
          </GarageAdminCard>
        );
      })}
    </ShowData>
  );
};
