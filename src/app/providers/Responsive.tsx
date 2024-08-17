"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { debounceTime, fromEvent, Subject, Subscription } from "rxjs";
import { v4 } from "uuid";

type ResponsiveContext = {
  screenWidthPx: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

const ResponsiveContext = createContext<ResponsiveContext | null>(null);

export function ResponsiveProvider({ children }: { children: ReactNode }) {
  const [screenWidthPx, setScreenWidthPx] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const setFlags = (width: number) => {
    if (width < 768) {
      setIsMobile(true);
      setIsTablet(false);
      setIsDesktop(false);
    } else if (width < 1024) {
      setIsMobile(false);
      setIsTablet(true);
      setIsDesktop(false);
    } else {
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(true);
    }
  };

  useEffect(() => {
    setFlags(screenWidthPx);
  }, [screenWidthPx]);

  useEffect(() => {
    const sub = fromEvent(window, "resize")
      .pipe(debounceTime(100))
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
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
}

export function useResponsiveContext() {
  return useContext(ResponsiveContext);
}
