'use client'
import {PropsWithChildren, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

import { jwtDecode } from "jwt-decode";
import styled from 'styled-components'

import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {
    authUserSelectors,
    initializeAuthUser
} from "@/app/store/reducers/authUserReducer";

import Header from "@/components/header/Header";

import {safeGetLocalStorage} from "@/utils/localStorage";

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

function Home(props: PropsWithChildren<{}>) {
    const [token, setToken] = useState<string | null>(safeGetLocalStorage("token"));
    const [decoded, setDecoded] = useState<Record<string, string> | null>(null)
    const router = useRouter();
    const dispatch  = useAppDispatch();
    const authUser = useAppSelector(authUserSelectors.getAuthUser);
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode<{email: string}>(token);
            setDecoded(decoded);
        } else {
            router.push("/login")
        }
    }, [token, router]);
    useEffect(() => {
        if(token) {
            dispatch(initializeAuthUser(jwtDecode(token as string)));
        }
    }, [token, dispatch])
    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    }
    return (
        <StyledMain>
           <Header handleLogout={handleLogout} username={authUser?.email?.replace(/@.*$/, "") || ""}></Header>
            <div className="router-outlet">
                {props.children}
            </div>
        </StyledMain>
    );
}

export default function WrappedHome (props: PropsWithChildren<{}>) {
    return (
            <Home>
                {props.children}
            </Home>
    );
};