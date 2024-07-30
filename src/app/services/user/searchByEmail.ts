import {
  collection,
  endAt,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "@firebase/firestore";
import { getFirebaseApp } from "@/firebase";

export async function searchByEmail(email: string): Promise<string[]> {
  const firebaseApp = getFirebaseApp();
  const db = getFirestore(firebaseApp);
  const q = query(
    collection(db, "users"),
    orderBy("email"),
    startAt(email),
    endAt(email + "~"),
    limit(10),
  );
  const result = await getDocs(q);
  const results = result.docs.map((doc) => doc.data().email);
  return results;
}
