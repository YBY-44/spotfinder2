import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
export const schemaCreateValet = z.object({
  uid: z.string().min(1, { message: "Valet uid is required" }),
  displayName: z.string().min(1, { message: "Valet displayName is required" }),
  licenceID: z.string().min(1, { message: "Valet licenceID is required" }),
  image: z.any().optional(),
});
export type FormTypeCreateValet = z.infer<typeof schemaCreateValet>;

export const useFormCreateValet = () => {
  return useForm<FormTypeCreateValet>({
    resolver: zodResolver(schemaCreateValet),
  });
};
