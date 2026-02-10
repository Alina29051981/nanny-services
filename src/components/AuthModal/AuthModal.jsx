// src/components/AuthModal/AuthModal.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  signInWithGoogle,
  loginWithEmail,
  registerWithEmail,
} from "../../auth";
import styles from "./AuthModal.module.css";

const schema = yup.object().shape({
  email: yup.string().email("Невірний email").required("Обов'язкове поле"),
  password: yup.string().min(6, "Мінімум 6 символів").required("Обов'язкове поле"),
});

const AuthModal = ({ isOpen, onClose, mode = "login" }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const onSubmit = async (data) => {
    try {
      if (mode === "login") await loginWithEmail(data.email, data.password);
      else await registerWithEmail(data.email, data.password);
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>
        <h2>{mode === "login" ? "Увійти" : "Реєстрація"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input type="email" placeholder="Email" {...register("email")} />
          <p className={styles.error}>{errors.email?.message}</p>

          <input type="password" placeholder="Пароль" {...register("password")} />
          <p className={styles.error}>{errors.password?.message}</p>

          <button type="submit">
            {mode === "login" ? "Увійти" : "Зареєструватися"}
          </button>
        </form>

        <hr />

        <button onClick={handleGoogleSignIn} className={styles.google}>
          Увійти через Google
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
