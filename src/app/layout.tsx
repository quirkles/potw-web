import { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import type { Metadata } from "next";

import "./styles/globals.css";
import "./styles/reset.css";

import { StoreProvider } from "@/app/store/StoreProvider";
import { NotificationProvider } from "@/app/providers/Notifications";
import { ResponsiveProvider } from "@/app/providers/Responsive";

import { overpassMono } from "@/app/styles/fonts";

export const metadata: Metadata = {
  title: "Pick of the week",
  description: "A weekly music club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <StoreProvider>
      <ResponsiveProvider>
        <NotificationProvider>
          <GoogleOAuthProvider clientId="242205172363-929p3ej7krpb009780q36s5s0460be2n.apps.googleusercontent.com">
            <html lang="en">
              <body className={overpassMono.className}>{children}</body>
            </html>
          </GoogleOAuthProvider>
        </NotificationProvider>
      </ResponsiveProvider>
    </StoreProvider>
  );
}
