"use client";
import Image from "next/image";
import { add } from "@spotfinder2/sample-lib";
import { useMutation, useQuery } from "@apollo/client";
import { CompaniesDocument } from "@spotfinder2/network/src/gql/generated";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { SearchGaragesDocument } from "@spotfinder2/network/src/gql/generated";
export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument);
  // const { data: sessionData, status } = useSession();
  console.log(data);
  // const [open, setIsOpen] = useState(false);
  const { data: garages } = useQuery(SearchGaragesDocument, {
    variables: {
      dateFilter: { end: "2024-7-31", start: "2024-7-23" },
      locationFilter: {
        ne_lat: 0.1,
        ne_lng: 0.1,
        sw_lat: -0.1,
        sw_lng: -0.1,
      },
    },
  });
  return (
    <main className="p-8">
      <div>
        {data?.companies.map((company) => {
          return (
            <div key={company.id} className="p-4 rounded">
              <div>{company.displayName}</div>
              <div>{company.description}</div>
            </div>
          );
        })}
      </div>
      <div className="p-8">
        {garages?.searchGarages.map((garage) => {
          return (
            <div key={garage.id}>
              <div>{garage.id}</div>
              <div>{garage.address?.lat}</div>
              <div>{garage.address?.lng}</div>
              <pre>{JSON.stringify(garage)}</pre>
            </div>
          );
        })}
      </div>
    </main>
  );
}
