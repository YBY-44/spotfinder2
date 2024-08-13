"use client";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { LoadingPage } from "../molecules/Loader";
import { AlertSection } from "../molecules/AlertSection";
import { Link } from "@mui/material";
import { Button } from "../atoms/Button";
type RenderPropChild = (uid: string) => ReactNode;
export const IsLoggedIn = ({
  children,
  notLoggedin,
}: {
  children: RenderPropChild | ReactNode;
  notLoggedin?: ReactNode;
}) => {
  const { status, data } = useSession();
  if (status === "loading") {
    return <LoadingPage text="Loading user..." />;
  }
  if (!data?.user?.uid) {
    if (notLoggedin) {
      return <>{notLoggedin}</>;
    } else {
      return (
        <AlertSection title="You are not logged in.">
          <Link href="/login">
            <Button size="lg">Login</Button>
          </Link>
        </AlertSection>
      );
    }
  }
  console.log("You are logged in.");
  return (
    <>
      {typeof children === "function"
        ? (children as RenderPropChild)(data.user.uid)
        : children}
    </>
  );
};
