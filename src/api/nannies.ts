 // src/api/nannies.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getNannies = async () => {
  const querySnapshot = await getDocs(collection(db, "nannies"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};