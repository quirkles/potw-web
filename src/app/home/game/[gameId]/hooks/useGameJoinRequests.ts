import {
  collection,
  doc,
  documentId,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import z from "zod";

import { getAppFirestore } from "@/firebase";

import { gameJoinRequestSchema } from "@/app/services/schemas/store/gameJoinRequest";

const gameJoinRequestWithRequesteeSchema = gameJoinRequestSchema.extend({
  requesteeSqlId: gameJoinRequestSchema.shape.requesteeId,
  requesteeEmail: gameJoinRequestSchema.shape.requesteeId,
});

type GameJoinRequestWithRequestee = z.infer<
  typeof gameJoinRequestWithRequesteeSchema
>;

interface HookReturnValue {
  respondToJoinRequest: (
    requestId: string,
    status: "accepted" | "rejected",
  ) => void;
  joinRequests: GameJoinRequestWithRequestee[];
}

export function useGameJoinRequests(gameId: string): HookReturnValue {
  const [gameJoinRequests, setGameGameJoinRequests] = useState<
    GameJoinRequestWithRequestee[]
  >([]);

  useEffect(() => {
    let collectionReference = collection(
      getAppFirestore(),
      "games",
      gameId,
      "joinRequests",
    );
    let queryReference = query(
      collectionReference,
      where("status", "==", "pending"),
    );
    const joinRequestsUnsub = onSnapshot(queryReference, (requestsSnapshot) => {
      if (requestsSnapshot.empty) {
        setGameGameJoinRequests([]);
        return;
      }
      getDocs(
        query(
          collection(getAppFirestore(), "users"),
          where(
            documentId(),
            "in",
            requestsSnapshot.docs.map((doc) => doc.data().requesteeId),
          ),
        ),
      ).then((snapshot) => {
        setGameGameJoinRequests(
          requestsSnapshot.docs.map((doc) => {
            const data = doc.data();
            const requestee = snapshot.docs
              .find((user) => user.id === data.requesteeId)
              ?.data();
            console.log("requestee", requestee);
            return gameJoinRequestWithRequesteeSchema.parse({
              ...data,
              requesteeSqlId: requestee?.sqlId,
              requesteeEmail: requestee?.email,
            });
          }),
        );
      });
    });
    return () => {
      joinRequestsUnsub();
    };
  }, []);

  const respondToJoinRequest = (
    requestId: string,
    status: "accepted" | "rejected",
  ) => {
    const joinRequestRef = doc(
      getAppFirestore(),
      "games",
      gameId,
      "joinRequests",
      requestId,
    );
    return setDoc(
      joinRequestRef,
      {
        status,
        updatedAt: new Date(),
      },
      { merge: true },
    );
  };

  return { respondToJoinRequest, joinRequests: gameJoinRequests };
}
