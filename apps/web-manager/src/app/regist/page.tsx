import { AuthLayout } from "@spotfinder2/ui/src/components/molecules/AuthLayout";
import { RegisterForm } from "@spotfinder2/ui/src/components/templates/RegistForm";
import React from "react";
export default function Page() {
  return (
    <AuthLayout title={"Regist"}>
      <RegisterForm />
    </AuthLayout>
  );
}
