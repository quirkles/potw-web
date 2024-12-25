import { TFirebaseGameWeekThemePollSchema } from "@potw/schemas";
import {
  doc,
  onSnapshot,
  updateDoc,
  DocumentSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";

import { getAppFirestore } from "@/firebase";

export function useGameWeekTheme(gameWeekFirestoreId: string): {
  theme: string | null;
  themePoll: TFirebaseGameWeekThemePollSchema | null;
  loading: boolean;
  error: Error | null;
  updateTheme: (newTheme: string | null) => Promise<void>;
  upsertThemePoll: (themes: string[]) => Promise<void>;
  voteForTheme: (theme: string, userId: string) => Promise<void>;
  finalizeThemePoll: () => Promise<void>;
} {
  const [theme, setTheme] = useState<string | null>(null);
  const [themePoll, setThemePoll] =
    useState<TFirebaseGameWeekThemePollSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const firestore = getAppFirestore();

  useEffect(() => {
    if (!gameWeekFirestoreId) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(firestore, "gameWeeks", gameWeekFirestoreId),
      (snapshot: DocumentSnapshot) => {
        setLoading(false);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setTheme(data?.theme ?? null);
          setThemePoll(data?.themePoll ?? null);
        } else {
          setTheme(null);
          setThemePoll(null);
        }
      },
      (err) => {
        setLoading(false);
        setError(err);
      },
    );

    return () => unsubscribe();
  }, [firestore, gameWeekFirestoreId]);

  const updateTheme = async (newTheme: string | null) => {
    try {
      await updateDoc(doc(firestore, "gameWeeks", gameWeekFirestoreId), {
        theme: newTheme,
      });
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const upsertThemePoll = async (themes: string[]) => {
    try {
      // Ensure the existing `themePoll` is fetched
      const existingPollOptions = themePoll?.options || {};

      // Build the updated poll: retain existing data for themes in the input array or add new ones
      const updatedPollOptions: TFirebaseGameWeekThemePollSchema["options"] =
        {};

      themes.forEach((theme) => {
        updatedPollOptions[theme] = existingPollOptions[theme] || { votes: [] };
      });

      // Update Firestore document
      await updateDoc(doc(firestore, "gameWeeks", gameWeekFirestoreId), {
        "themePoll.options": updatedPollOptions,
      });
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const voteForTheme = async (theme: string, userId: string) => {
    try {
      if (!themePoll || !themePoll.options || !(theme in themePoll.options)) {
        throw new Error("Invalid theme or no poll exists");
      }

      // Remove user's vote from all other themes
      const updatedPollOptions = { ...themePoll.options };
      Object.keys(updatedPollOptions).forEach((t) => {
        updatedPollOptions[t] = {
          votes: updatedPollOptions[t].votes.filter((id) => id !== userId),
        };
      });

      // Add user's vote to selected theme
      updatedPollOptions[theme] = {
        votes: [...updatedPollOptions[theme].votes, userId],
      };

      await updateDoc(doc(firestore, "gameWeeks", gameWeekFirestoreId), {
        "themePoll.options": updatedPollOptions,
      });
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const finalizeThemePoll = async () => {
    try {
      if (!themePoll || !themePoll.options) {
        throw new Error("No poll exists to finalize");
      }

      // Determine the theme with the highest number of votes
      let finalizedTheme: string | null = null;
      let maxVotes = 0;

      Object.entries(themePoll.options).forEach(([theme, { votes }]) => {
        if (votes.length > maxVotes) {
          maxVotes = votes.length;
          finalizedTheme = theme;
        }
      });

      if (!finalizedTheme) {
        throw new Error("Unable to finalize theme poll: no votes");
      }

      // Update Firestore document with the finalized theme
      await updateDoc(doc(firestore, "gameWeeks", gameWeekFirestoreId), {
        theme: finalizedTheme,
        "themePoll.status": "closed",
      });

      // Update local state
      setTheme(finalizedTheme);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    theme,
    themePoll,
    loading,
    error,
    updateTheme,
    upsertThemePoll,
    voteForTheme,
    finalizeThemePoll,
  };
}
