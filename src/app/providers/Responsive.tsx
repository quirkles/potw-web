"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { debounceTime, fromEvent, Subject, Subscription } from "rxjs";

type ResponsiveContext = {
  screenWidthPx: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: "mobile" | "tablet" | "desktop";
};

const ResponsiveContext = createContext<ResponsiveContext | null>(null);

export function ResponsiveProvider({ children }: { children: ReactNode }) {
  const [screenWidthPx, setScreenWidthPx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "mobile",
  );

  const setFlags = (width: number) => {
    if (width < 768) {
      setIsMobile(true);
      setIsTablet(false);
      setIsDesktop(false);
      setScreenSize("mobile");
    } else if (width < 1024) {
      setIsMobile(false);
      setIsTablet(true);
      setIsDesktop(false);
      setScreenSize("tablet");
    } else {
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(true);
      setScreenSize("desktop");
    }
  };

  useEffect(() => {
    setFlags(screenWidthPx);
  }, [screenWidthPx]);

  useEffect(() => {
    setScreenWidthPx(window.innerWidth);
    const sub = fromEvent(window, "resize")
      .pipe(debounceTime(50))
      .subscribe((e) => {
        const target = e.target as Window;
        setScreenWidthPx(target.innerWidth);
      });
    return () => {
      sub.unsubscribe();
    };
  }, [setScreenWidthPx]);
  return (
    <ResponsiveContext.Provider
      value={{
        screenWidthPx,
        isMobile,
        isTablet,
        isDesktop,
        screenSize,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
}

export function useResponsiveContext() {
  return useContext(ResponsiveContext);
}
