import { doc, onSnapshot, setDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";

import { getAppFirestore } from "@/firebase";

type RequestStatus = null | "accepted" | "rejected" | "pending";

interface HookReturnValue {
  requestToJoinGame: () => void;
  currentRequestStatus: RequestStatus;
}

export function useRequestToJoinGame(
  gameId: string,
  requesteeId: string,
): HookReturnValue {
  const [currentRequestStatus, setCurrentRequestStatus] =
    useState<RequestStatus>(null);

  useEffect(() => {
    const documentSnapshotUnsub = onSnapshot(
      doc(getAppFirestore(), "games", gameId, "joinRequests", requesteeId),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data) {
            setCurrentRequestStatus(data.status);
            return;
          }
        }
        setCurrentRequestStatus(null);
      },
    );
    return () => {
      documentSnapshotUnsub();
    };
  });
  const requestToJoinGame = () => {
    if (currentRequestStatus !== null) {
      return;
    }
    const joinRequestRef = doc(
      getAppFirestore(),
      "games",
      gameId,
      "joinRequests",
      requesteeId,
    );
    return setDoc(
      joinRequestRef,
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "pending",
        requesteeId,
      },
      { merge: true },
    );
  };
  return { requestToJoinGame, currentRequestStatus };
}
