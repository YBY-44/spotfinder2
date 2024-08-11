"use client";
import { useEffect, useState } from "react";
import { useFormLogin } from "@spotfinder2/forms/src/login";
import { Form } from "@spotfinder2/ui/src/components/atoms/Form";
import { HtmlLabel } from "@spotfinder2/ui/src/components/atoms/Label";
import { HtmlInput } from "@spotfinder2/ui/src/components/atoms/Input";
import { Button } from "../atoms/Button";
import Link from "next/link";
import { getProviders, signIn } from "next-auth/react";
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";
export interface ILoginFormProps {
  className?: string;
}
export const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin();
  const { replace } = useRouter();

  const [loading, setLoading] = useState(false);

  if (errors.email?.message) {
    console.log("Error: " + errors.email?.message);
  }
  if (errors.password?.message) {
    console.log("Error: " + errors.password?.message);
  }

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        console.log("(send) login data: " + JSON.stringify(data));
        const { email, password } = data;
        console.log("email: " + email);
        console.log("password: " + password);
        try {
          const providers = await getProviders();
          if (!providers || !providers.credentials) {
            console.error("No providers found!");
          }
          console.log(providers);
          const logResult = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
          console.log(logResult);
          if (logResult?.ok) {
            replace("/");
          }
          if (logResult?.error) {
            console.log("Error: " + logResult.error);
            alert("Error: " + "Invalid username or password!");
          }
        } catch (error) {
          console.error("Error: " + error);
        }
      })}
    >
      <HtmlLabel error={errors.email?.message}>
        <HtmlInput {...register("email")} className="" />
      </HtmlLabel>
      <HtmlLabel error={errors.password?.message}>
        <HtmlInput {...register("password")} className="" type="password" />
      </HtmlLabel>
      <Button type="submit">Submit</Button>

      <div className="mt-4 text-sm flex flex-col">
        <div>Do not have an spotfinder2 account?</div>
        <div className="flex items-center mt-2">
          <Link
            href="/regist"
            className="font-bold bg-primary text-white p-1 px-2 mx-3 rounded-md"
          >
            Create one
          </Link>{" "}
          now
        </div>
      </div>
    </Form>
  );
};
