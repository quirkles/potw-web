import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "@firebase/firestore";
import { getFirebaseApp } from "@/firebase";

export async function searchByEmail(email: string): Promise<string[]> {
  const firebaseApp = getFirebaseApp();
  const db = getFirestore(firebaseApp);
  const q = query(collection(db, "users"), where("email", "==", email));
  const result = await getDocs(q);
  const results = result.docs.map((doc) => doc.data().email);
  return results;
}
