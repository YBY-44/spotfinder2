"use client";
import { Valet, ValetMeDocument } from "@spotfinder2/network/src/gql/generated";
import { useQuery } from "@apollo/client";
import { LoadingPage } from "../molecules/Loader";
import { AlertSection } from "../molecules/AlertSection";
import { CreateCompany } from "./CreateCompnay";
import { ReactNode } from "react";
import { AddValet } from "./AddValet";

type RenderChildren = (id: number) => ReactNode;
export const IsValet = ({
  children,
  uid,
}: {
  children: RenderChildren | ReactNode;
  uid: string;
}) => {
  const { data, loading } = useQuery(ValetMeDocument);
  if (loading) {
    return <LoadingPage text="Loading your company." />;
  }
  if (!data?.valetMe?.companyId) {
    return (
      <AlertSection>
        <div className="">You are not a valet yet</div>
        <div>{"Please contect the company's manager with your user ID: "}</div>
        <div className="mb-3"> {uid}</div>
      </AlertSection>
    );
  }
  return (
    <>
      {typeof children === "function"
        ? (children as RenderChildren)(data.valetMe.companyId)
        : children}
    </>
  );
};
