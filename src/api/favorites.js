// src/api/favorites.js
import { db } from "../firebase";
import { ref, get, set, remove } from "firebase/database";

/**
 * Отримати список обраних для користувача
 */
export const getFavorites = async (uid) => {
  const snapshot = await get(ref(db, `users/${uid}/favorites`));
  return snapshot.val() || {}; // повертаємо об'єкт {nannyId: true}
};

/**
 * Додати няню у Favorites
 */
export const addFavorite = async (uid, nannyId) => {
  await set(ref(db, `users/${uid}/favorites/${nannyId}`), true);
};

/**
 * Видалити няню з Favorites
 */
export const removeFavorite = async (uid, nannyId) => {
  await remove(ref(db, `users/${uid}/favorites/${nannyId}`));
};
