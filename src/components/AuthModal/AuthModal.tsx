// src/components/AuthModal/AuthModal.tsx
import { useEffect } from "react";
import styles from "./AuthModal.module.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import {
  signInWithGoogle,
  loginWithEmail,
  registerWithEmail,
} from "../../auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
}

interface FormData {
  email: string;
  password: string;
}

const schema: yup.ObjectSchema<FormData> = yup.object({
  email: yup
    .string()
    .email("Невірний email")
    .required("Обов'язкове поле"),
  password: yup
    .string()
    .min(6, "Мінімум 6 символів")
    .required("Обов'язкове поле"),
});

const AuthModal = ({ isOpen, onClose, mode }: AuthModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Закриття по ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Submit форма
  const onSubmit = async (data: FormData) => {
    try {
      if (mode === "login") {
        await loginWithEmail(data.email, data.password);
      } else {
        await registerWithEmail(data.email, data.password);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  // Google login
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>
          {mode === "login" ? "Log In" : "Registration"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={styles.input}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={styles.input}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          <button type="submit" className={styles.submitBtn}>
            {mode === "login" ? "Log In" : "Register"}
          </button>
        </form>

        <hr className={styles.divider} />

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className={styles.googleBtn}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AuthModal;