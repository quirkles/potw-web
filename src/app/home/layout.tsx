'use client'
import {PropsWithChildren, useEffect, useState} from "react";

import { jwtDecode, JwtPayload } from "jwt-decode";
import styled from 'styled-components'
import Header from "@/components/header/Header";
import {useRouter} from "next/navigation";
import {safeGetLocalStorage} from "@/utils/localStorage";
import {COLORS} from "@/app/styles/colors";
import Button from "@/components/button/Button";
import {SIZE, Spacer} from "@/components/spacer/Spacer";
import {MusicSvg} from "@/components/icons";

const StyledMain = styled.main`
    height: 100%;
    display: flex;
    flex-direction: column;
    > * {
        &:first-child {
            flex-grow: 0;
        }
        flex-grow: 1;
    }
    .router-outlet {
        position: relative;
    }
`

export default function Home(props: PropsWithChildren<{}>) {
    const [token, setToken] = useState<string | null>(safeGetLocalStorage("token"));
    const [decoded, setDecoded] = useState<Record<string, string> | null>(null)
    const router = useRouter();
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode<{email: string}>(token);
            setDecoded(decoded);
        } else {
            router.push("/login")
        }
    }, [token, router]);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    }
    return (
        <StyledMain>
           <Header handleLogout={handleLogout} email={decoded?.email || ""}></Header>
            <div className="router-outlet">
                <Spacer $padding={SIZE.medium}>
                    {props.children}
                </Spacer>
            </div>
        </StyledMain>
    );
}