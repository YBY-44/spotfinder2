'use client'
import Image from 'next/image';
import { add } from '@spotfinder2/sample-lib';
import { useMutation, useQuery } from '@apollo/client';
import { CompaniesDocument } from '@spotfinder2/network/src/gql/generated';
export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument);
  console.log(data);
  return (
    <main>
      sss
      <div>
        {data?.companies.map((company) => {
          return (<div key={company.id} className='p-4 rounded bg-gray-100'>
            <div>{company.displayName}</div>
            <div>{company.description}</div>
            </div>);
        })}
      </div>
    </main>
  );
}
