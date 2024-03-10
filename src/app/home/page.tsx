'use client'
import {useEffect, useState} from "react";

import { jwtDecode, JwtPayload } from "jwt-decode";
import styled from 'styled-components'
import Header from "@/components/header/Header";
import {useRouter} from "next/navigation";
import {safeGetLocalStorage} from "@/utils/localStorage";

const StyledMain = styled.main``

export default function Home() {
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
        </StyledMain>
    );
}