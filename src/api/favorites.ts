import { doc, getDoc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Отримати favorites користувача
 */
export const getFavorites = async (userId: string) => {
  const ref = doc(db, "users", userId);
  const snapshot = await getDoc(ref);

  if (snapshot.exists()) {
    return snapshot.data().favorites || {};
  }

  return {};
};

/**
 * Додати в favorites
 */
export const addFavorite = async (userId: string, nannyId: string) => {
  const ref = doc(db, "users", userId);

  await setDoc(
    ref,
    {
      favorites: {
        [nannyId]: true,
      },
    },
    { merge: true }
  );
};

/**
 * Видалити з favorites (правильно через deleteField)
 */
export const removeFavorite = async (userId: string, nannyId: string) => {
  const ref = doc(db, "users", userId);

  await updateDoc(ref, {
    [`favorites.${nannyId}`]: deleteField(),
  });
};