import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const urlRegexes = [
  /^\/home\/game\/(?<gameId>[a-zA-Z0-9-]+).*/,
  /^\/home\/gameWeek\/.*\/(?<gameWeekId>[a-zA-Z0-9-]+).*/,
  /^\/home\/user\/(?<userId>[a-zA-Z0-9-]+).*/,
];

export function useUrlParams(): {
  gameId: string | null;
  gameWeekId: string | null;
  userId: string | null;
} {
  const [gameId, setGameId] = useState<string | null>(null);
  const [gameWeekId, setGameWeekId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const result = urlRegexes.reduce(
      (execResult: RegExpExecArray | null, regex: RegExp) => {
        if (execResult) {
          return execResult;
        }
        if (regex.test(pathname)) {
          return regex.exec(pathname);
        }
        return null;
      },
      null,
    );
    if (!result) {
      setGameId(null);
      setGameWeekId(null);
      setUserId(null);
      return;
    }
    const groups = result.groups;
    if (groups) {
      setGameId(groups.gameId || null);
      setGameWeekId(groups.gameWeekId || null);
      setUserId(groups.userId || null);
    }
  }, [pathname]);

  return { gameId, gameWeekId, userId };
}
