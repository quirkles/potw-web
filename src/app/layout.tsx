import { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import styled from "styled-components";

import type { Metadata } from "next";

import "./styles/globals.css";
import "./styles/reset.css";
import { StoreProvider } from "@/app/store/StoreProvider";
import { NotificationProvider } from "@/app/providers/Notifications";
import { overpassMono } from "@/app/styles/fonts";

const Styled = styled.body`
  * {
    font-family: ${overpassMono.style.fontFamily};
  }
`;

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
      <NotificationProvider>
        <GoogleOAuthProvider clientId="242205172363-929p3ej7krpb009780q36s5s0460be2n.apps.googleusercontent.com">
          <html lang="en">
            <body>{children}</body>
          </html>
        </GoogleOAuthProvider>
      </NotificationProvider>
    </StoreProvider>
  );
}
