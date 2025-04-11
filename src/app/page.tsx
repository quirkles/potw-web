"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getFirebaseApp } from "@/firebase";

import { useAppDispatch } from "@/app/store/hooks";
import {
  IAuthUser,
  initializeAuthUser,
} from "@/app/store/reducers/authUserReducer";
import { usersSlice } from "@/app/store/reducers/usersReducer";

import { safeGetLocalStorage } from "@/utils/localStorage";

export default function Home() {
  const [token] = useState<string | null>(safeGetLocalStorage("token"));
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    getFirebaseApp();
    if (window.localStorage.getItem("token")) {
      dispatch(
        initializeAuthUser(
          jwtDecode(window.localStorage.getItem("token") as string),
        ),
      );
    }
    const setUserInStore = (e: StorageEvent) => {
      if (e.key === "token" && e.newValue) {
        const decodedToken: IAuthUser = jwtDecode(e.newValue);
        dispatch(initializeAuthUser(decodedToken));
        if (decodedToken?.sqlId) {
          dispatch(usersSlice.actions.fetchUserById(decodedToken.sqlId));
        }
      }
    };
    window.addEventListener("storage", setUserInStore);
    return () => {
      window.removeEventListener("storage", setUserInStore);
    };
  });
  useEffect(() => {
    if (token) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [token, router]);
}
