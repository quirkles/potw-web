'use client'
import {useEffect, useState} from "react";

import { jwtDecode, JwtPayload } from "jwt-decode";
import styled from 'styled-components'
import Header from "@/components/header/Header";
import {useRouter} from "next/navigation";

const StyledMain = styled.main``

export default function Home() {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
    const [decoded, setDecoded] = useState<JwtPayload | null>(null)
    const router = useRouter();
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
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
           <Header handleLogout={handleLogout}></Header>
            <code>{JSON.stringify(decoded||{}, null, 2)}</code>
        </StyledMain>
    );
}