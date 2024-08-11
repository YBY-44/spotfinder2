import { formschemaCreateSlot } from "./createGarage";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
export type FormTypeCreateManySlot = z.infer<typeof formschemaCreateSlot>;
export const useFormCreateManySlot = () => {
  return useForm<FormTypeCreateManySlot>({
    resolver: zodResolver(formschemaCreateSlot),
  });
};
