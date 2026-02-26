import { useEffect, useMemo, useState } from "react";
import styles from "./AuthModal.module.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { getAuthErrorMessage } from "../../utils/authErrorHandler";

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
  name?: string;
  email: string;
  password: string;
}

const AuthModal = ({ isOpen, onClose, mode }: AuthModalProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // 🔥 додано

  const schema = useMemo(() => {
    return yup.object({
      name:
        mode === "register"
          ? yup
              .string()
              .required("Обов'язкове поле")
              .min(2, "Мінімум 2 символи")
          : yup.string().notRequired(),
      email: yup
        .string()
        .email("Невірний email")
        .required("Обов'язкове поле"),
      password: yup
        .string()
        .min(6, "Мінімум 6 символів")
        .required("Обов'язкове поле"),
    });
  }, [mode]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const onSubmit = async (data: FormData) => {
    try {
      setServerError(null);

      if (mode === "login") {
        await loginWithEmail(data.email, data.password);
      } else {
        await registerWithEmail(data.email, data.password, data.name);
      }

      onClose();
    } catch (error: any) {
      setServerError(getAuthErrorMessage(error));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setServerError(null);
      await signInWithGoogle();
      onClose();
    } catch (error: any) {
      setServerError(getAuthErrorMessage(error));
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
          <svg className={styles.closeIcon}>
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <h2 className={styles.title}>
          {mode === "login" ? "Log In" : "Registration"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {mode === "register" && (
            <>
              <input
                type="text"
                placeholder="Name"
                autoComplete="name"
                {...register("name")}
                className={styles.input}
              />
              {errors.name && (
                <p className={styles.error}>{errors.name.message}</p>
              )}
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
            className={styles.input}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          {/* 🔥 PASSWORD З ІКОНКОЮ */}
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              {...register("password")}
              className={styles.input}
            />

            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <svg width="20" height="20">
               <use
  href={`/sprite.svg#${
    showPassword ? "icon-eye-off" : "icon-eye"
  }`}
/>
              </svg>
            </button>
          </div>

          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          {serverError && (
            <p className={styles.error}>{serverError}</p>
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