"use client";
import { ReactNode } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import React from "react";
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};
