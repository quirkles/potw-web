'use client'

import {useEffect, useState} from "react";

import {safeGetLocalStorage} from "@/utils/localStorage";
import {useRouter} from "next/navigation";

export default function Home() {
    const [token, setToken] = useState<string | null>(safeGetLocalStorage("token"));
    const router = useRouter();
    useEffect(() => {
        if (token) {
            router.push("/home")
        } else {
            router.push("/login")
        }
    }, [token, router]);
}
