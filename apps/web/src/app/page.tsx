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
  return (
    <main className="p-8">
      11
    </main>
  );
}
