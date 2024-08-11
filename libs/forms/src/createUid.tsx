import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchemaUid = z.object({
  uid: z.string(),
});
export type FormTypeUid = z.infer<typeof formSchemaUid>;

export const useFormUid = () => {
  return useForm<FormTypeUid>({
    resolver: zodResolver(formSchemaUid),
  });
};
