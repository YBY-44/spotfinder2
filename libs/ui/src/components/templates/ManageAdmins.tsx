"use client";
import { useTakeStep } from "@spotfinder2/util/hooks/pagination";
import { useQuery, useMutation } from "@apollo/client";
import {
  AdminsDocument,
  namedOperations,
} from "@spotfinder2/network/src/gql/generated";
import { ShowData } from "../organisms/ShowData";
import { AdminCard } from "../organisms/admin/AdminCard";
import { RemoveAdmin } from "../organisms/admin/RemoveAdmin";
import { useEffect } from "react";
import { CreateAdmin } from "../organisms/admin/CreateAdmin";
export const ManageAdmins = () => {
  const { setSkip, setTake, skip, take } = useTakeStep();
  const { data, loading } = useQuery(AdminsDocument, {
    variables: {
      skip,
      take,
    },
  });
  return (
    <>
      <div className="flex justify-end m-4">
        <CreateAdmin />
      </div>
      <ShowData
        loading={loading}
        title={"Manage Admins"}
        pagination={{
          setSkip,
          setTake,
          skip,
          take,
          totalCount: data?.adminsCount || 0,
          resultCount: data?.admins.length || 0,
        }}
      >
        {data?.admins.map((admin) => {
          return (
            <div
              key={admin.uid}
              className=" bg-white pl-1 rounded-md shadow-md"
            >
              <div className="pl-2 m-2 border-l-2 border-primary bg-white shadow-none">
                <AdminCard key={admin.uid} admin={admin}>
                  <div className="flex justify-end">
                    <RemoveAdmin uid={admin.uid} />
                  </div>
                </AdminCard>
              </div>
            </div>
          );
        })}
      </ShowData>
    </>
  );
};
