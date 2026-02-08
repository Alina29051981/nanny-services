// auth.js
import { auth, provider } from "./firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/**
 * Google Sign-In
 * Повертає Promise з user або помилкою
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // повертаємо об'єкт користувача
  } catch (error) {
    console.error("Помилка входу через Google:", error.message);
    throw error;
  }
};

/**
 * Реєстрація через Email/Password
 * @param {string} email
 * @param {string} password
 */
export const registerWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Помилка реєстрації:", error.message);
    throw error;
  }
};

/**
 * Логін через Email/Password
 * @param {string} email
 * @param {string} password
 */
export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Помилка логіну:", error.message);
    throw error;
  }
};

/**
 * Вихід користувача
 */
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Помилка логауту:", error.message);
    throw error;
  }
};

/**
 * Хук / підписка на поточного користувача
 * @param {function} callback - функція, яка отримує user або null
 */
export const onUserStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
};
