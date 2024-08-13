import {
  collection,
  endAt,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAt,
} from "@firebase/firestore";
import { getFirebaseApp } from "@/firebase";

export async function searchByEmail(email: string): Promise<
  {
    displayText: string;
    value: string;
  }[]
> {
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
  return result.docs.map((doc) => ({
    displayText: doc.data().email,
    value: doc.id,
  }));
}
