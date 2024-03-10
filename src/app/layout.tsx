import {ReactNode} from "react";

import type {Metadata} from "next";
import {Overpass_Mono} from "next/font/google";

import {GoogleOAuthProvider} from '@react-oauth/google';
import "./styles/globals.css";
import "./styles/reset.css";

const overpassMono = Overpass_Mono({subsets: ["latin"]});

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
        <GoogleOAuthProvider
            clientId="242205172363-929p3ej7krpb009780q36s5s0460be2n.apps.googleusercontent.com"
        >
            <html lang="en">
                <body className={overpassMono.className}>
                    {children}
                </body>
            </html>
        </GoogleOAuthProvider>
    );
}
