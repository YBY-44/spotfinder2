import { CompanyValetsQuery } from "@spotfinder2/network/src/gql/generated";
import { format } from "date-fns";
import Image from "next/image";
export interface ValetProps {
  valet: CompanyValetsQuery["companyValets"][number];
}
export const ValetCard = ({ valet }: ValetProps) => {
  return (
    <div className="space-y-2">
      <div className="p-2 shadow-lg bg-white rounded-md w-full flex flex-col">
        <Image
          className="object-cover w-full aspect-square mb-1"
          width={200}
          height={300}
          src={valet.image || "/valet.peg"}
          alt={"Valet"}
        />
        <div className="my-2 w-full flex flex-col">
          <div className="mb-1 font-semibild text-lg">{valet.displayName}</div>
          <div className="mb-1 text-xs">{"ID: " + valet.uid}</div>
          <div className="mb-1 text-xs">{"LicenceID: " + valet.licenceID}</div>
          <div className="mb-1 text-xs text-gray">
            {format(new Date(valet.createdAt), "PP")}
          </div>
        </div>
      </div>
    </div>
  );
};
