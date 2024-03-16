'use client'

import {useEffect, useState} from "react";

import {safeGetLocalStorage} from "@/utils/localStorage";
import {useRouter} from "next/navigation";
import {jwtDecode} from "jwt-decode";
import {useAppDispatch} from "@/app/store/hooks";
import {initializeAuthUser} from "@/app/store/reducers/authUserReducer";

export default function Home() {
    const [token, setToken] = useState<string | null>(safeGetLocalStorage("token"));
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(window.localStorage.getItem("token")) {
            dispatch(initializeAuthUser(jwtDecode(window.localStorage.getItem("token") as string)))
        }
        const setUserInStore = (e: StorageEvent) => {
            if (e.key === "token" && e.newValue) {
                dispatch(initializeAuthUser(jwtDecode(e.newValue)))
            }
        }
        window.addEventListener("storage", setUserInStore)
        return () => {
            window.removeEventListener("storage", setUserInStore)
        }
    });
    useEffect(() => {
        if (token) {
            router.push("/home")
        } else {
            router.push("/login")
        }
    }, [token, router]);
}
