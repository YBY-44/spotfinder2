import { AuthLayout } from "@spotfinder2/ui/src/components/molecules/AuthLayout";
import { LoginForm } from "@spotfinder2/ui/src/components/templates/LoginForm";
import React from "react";
export default function Page() {
  return (
    <AuthLayout title={"Login"}>
      <LoginForm />
    </AuthLayout>
  );
}
