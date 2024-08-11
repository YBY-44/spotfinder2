"use client";
import { LoadingPage } from "../molecules/Loader";
import { AlertSection } from "../molecules/AlertSection";
import { ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { AdminMeDocument } from "@spotfinder2/network/src/gql/generated";
import { useSession } from "next-auth/react";
type RenderPropChildren = (id: string) => ReactNode;

export const IsAdmin = ({
  children,
}: {
  children: RenderPropChildren | ReactNode;
}) => {
  const { data, loading } = useQuery(AdminMeDocument);
  if (loading) {
    return <LoadingPage text="Loading company..." />;
  }
  if (!data?.adminMe?.uid) {
    return (
      <AlertSection>
        <div className="p-2">You are not Admin.</div>
      </AlertSection>
    );
  }
  return (
    <>
      {typeof children === "function"
        ? (children as RenderPropChildren)(data?.adminMe.uid)
        : children}
    </>
  );
};
