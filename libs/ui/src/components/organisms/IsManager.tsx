"use client";
import { MyCompanyDocument } from "@spotfinder2/network/src/gql/generated";
import { BaseComponent } from "@spotfinder2/util/types";
import { useQuery } from "@apollo/client";
import { LoadingPage } from "../molecules/Loader";
import { AlertSection } from "../molecules/AlertSection";
import { CreateCompany } from "./CreateCompnay";
import React, { ReactNode } from "react";
type RenderPropChild = (id: number) => ReactNode;
export const IsManager = ({
  children,
}: {
  children: RenderPropChild | ReactNode;
}) => {
  console.log("Checking if you are a manager...");
  const { data, loading } = useQuery(MyCompanyDocument);
  if (loading) {
    console.log("Loading company...");
    return <LoadingPage text="Loading company..."></LoadingPage>;
  }
  if (!data?.myCompany) {
    console.log("You are not a manager.");
    return (
      <AlertSection>
        <div>You don&apos;t have a company yet.</div>
        <CreateCompany />
      </AlertSection>
    );
  }
  return (
    <>
      {typeof children === "function"
        ? (children as RenderPropChild)(data.myCompany.id)
        : children}
    </>
  );
};
