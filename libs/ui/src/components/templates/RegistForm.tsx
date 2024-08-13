"use client";
import { Role } from "@spotfinder2/util/types";
import { useFormRegister } from "@spotfinder2/forms/src/register";
import { useMutation } from "@apollo/client";
import {
  RegistUserwithUserselfDocument,
  RegistUserwithProviderDocument,
} from "@spotfinder2/network/src/gql/generated";
import { Form } from "../atoms/Form";
import { signIn } from "next-auth/react";
import { HtmlLabel } from "../atoms/Label";
import { HtmlInput } from "../atoms/Input";
import { Button } from "../atoms/Button";
import Link from "next/link";

export interface ISignupFormProps {
  className?: string;
  role?: Role;
}
// 注册表单
export const RegisterForm = ({ className, role }: ISignupFormProps) => {
  // 获取用户注册表单的信息
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister();
  // 执行后端查询 获取后端函数，状态和数据
  const [registerWithUserselfDocument, { loading }] = useMutation(
    RegistUserwithUserselfDocument,
    {
      onError: (error) => {
        console.error("GraphQL Error:", error.message);
        alert(`Registration failed: ${error.message}`);
      },
    },
  );

  return (
    <Form
      onSubmit={handleSubmit(async (formData) => {
        // 调用函数执行注册
        const { data, errors } = await registerWithUserselfDocument({
          variables: {
            registWithUserselfInput: formData,
          },
        });
        // 如果有错误，弹出错误信息
        if (errors) {
          console.log(errors);
        }
        // 如果注册成功，弹出注册成功信息
        if (data) {
          alert(`User ${data.registUserwithUserself.uid} created. 🎉`);
          //
          signIn("credentials", {
            email: formData.email,
            password: formData.password,
            callbackUrl: "/",
          });
        }
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message} className="text-white">
        <HtmlInput
          className="text-black"
          placeholder="Enter the email."
          {...register("email")}
        />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message} className="text-white">
        <HtmlInput
          className="text-black"
          type="password"
          placeholder="······"
          {...register("password")}
        />
      </HtmlLabel>
      <HtmlLabel title="Display name" error={errors.name?.message} className="text-white">
        <HtmlInput
          className="text-black"
          placeholder="Enter your name."
          {...register("name")}
        />
      </HtmlLabel>
      {Object.keys(errors).length ? (
        <div className="text-xs text-white-600">
          Please fix the above {Object.keys(errors).length} errors
        </div>
      ) : null}
      <Button type="submit" fullWidth loading={loading}>
        Register
      </Button>
      <div className="mt-4 text-sm flex flex-col">
        <div>Already have an spotfinder2 account?</div>
        <div className="flex items-center mt-2">
          <Link
            href="/login"
            className="font-bold bg-primary text-white p-2 px-4 mx-3 rounded-md"
          >
            Login
          </Link>{" "}
          now
        </div>
      </div>
    </Form>
  );
};
