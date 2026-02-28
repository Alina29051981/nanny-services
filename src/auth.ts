import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile, 
  GoogleAuthProvider,
} from "firebase/auth";

import type { User } from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User> => {
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const registerWithEmail = async (
  email: string,
  password: string,
  name: string 
): Promise<User> => {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

    await updateProfile(result.user, {
    displayName: name,
  });

  return result.user;
};

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return result.user;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const onUserStateChange = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};