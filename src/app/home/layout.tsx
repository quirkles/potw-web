"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { styled } from "styled-components";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  authUserSelectors,
  initializeAuthUser,
} from "@/app/store/reducers/authUserReducer";

import Header from "@/components/header/Header";
import { Notifications } from "@/components/notifications/Notifications";

import { safeGetLocalStorage } from "@/utils/localStorage";

const StyledMain = styled.main`
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  > * {
    &:first-child {
      flex-basis: 4em;
      height: 4em;
    }
    &:nth-child(2) {
      height: calc(100vh - 4em);
      overflow: hidden;
    }
  }
`;

function Home(props: PropsWithChildren<{}>) {
  const [token, setToken] = useState<string | null>(
    safeGetLocalStorage("token"),
  );
  const [decoded, setDecoded] = useState<Record<string, string> | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(authUserSelectors.getAuthUser);
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<{ email: string }>(token);
      setDecoded(decoded);
    } else {
      router.push("/login");
    }
  }, [token, router]);
  useEffect(() => {
    if (token) {
      dispatch(initializeAuthUser(jwtDecode(token as string)));
    }
  }, [token, dispatch]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <StyledMain>
      <Header
        handleLogout={handleLogout}
        user={{
          username: authUser?.email?.replace(/@.*$/, "") || "",
          sqlId: authUser?.sqlId || "",
        }}
      ></Header>
      <div className="router-outlet">{props.children}</div>
      <Notifications />
    </StyledMain>
  );
}

function WrappedHome(props: PropsWithChildren<{}>) {
  return <Home>{props.children}</Home>;
}

export default WrappedHome;
