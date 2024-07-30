import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchemaRegister } from "./schemas";
import { z } from "zod";

export type FormTypeRegister = z.infer<typeof formSchemaRegister>;

export const useFormRegister = () =>
  useForm<FormTypeRegister>({
    resolver: zodResolver(formSchemaRegister),
  });
