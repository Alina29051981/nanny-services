// src/api/nannies.js
import { db } from "../firebase";
import { ref, get } from "firebase/database";

export const getNannies = async () => {
  const snapshot = await get(ref(db, "nannies"));
  const data = snapshot.val() || {};
  // Преобразуємо в масив
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
};
