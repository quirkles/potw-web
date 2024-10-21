"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { styled } from "styled-components";

import { getColor } from "@/app/styles/colors";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  IAuthUser,
  initializeAuthUser,
} from "@/app/store/reducers/authUserReducer";
import { usersSlice } from "@/app/store/reducers/usersReducer";
import { authUserSelector } from "@/app/store/selectors/authUser";

import { useResponsiveContext } from "@/app/providers/Responsive";

import Header from "@/components/header/Header";
import { FlexContainer } from "@/components/layout/FlexContainer";
import { Notifications } from "@/components/notifications/Notifications";

import { safeGetLocalStorage } from "@/utils/localStorage";

const StyledMain = styled.main<{
  $screenSize: "mobile" | "tablet" | "desktop" | undefined;
}>`
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: linear-gradient(
    -45deg,
    ${getColor("orange")},
    ${getColor("red")},
    ${getColor("blue")},
    ${getColor("green")}
  );
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  > * {
    &:first-child {
      flex-basis: 4em;
      height: 4em;
    }
    &:nth-child(2) {
      height: calc(100vh - 4em);
      overflow: hidden;
      > * {
        flex-basis: ${(props) =>
          props.$screenSize === "desktop" ? "70%" : "100%"};
      }
    }
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
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
  const authUser = useAppSelector(authUserSelector);
  const responsive = useResponsiveContext();
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
      const decodedToken: IAuthUser = jwtDecode(token);
      dispatch(initializeAuthUser(decodedToken));
      if (decodedToken?.sqlId) {
        dispatch(usersSlice.actions.fetchUserById(decodedToken.sqlId));
      }
    }
  }, [token, dispatch]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <StyledMain $screenSize={responsive?.screenSize}>
      <Header
        handleLogout={handleLogout}
        user={{
          username: authUser?.email?.replace(/@.*$/, "") || "",
          sqlId: authUser?.sqlId || "",
        }}
      ></Header>
      <FlexContainer $justifyContent="center" $alignItems="center">
        {props.children}
      </FlexContainer>
      <Notifications />
    </StyledMain>
  );
}

function WrappedHome(props: PropsWithChildren<{}>) {
  return <Home>{props.children}</Home>;
}

export default WrappedHome;
