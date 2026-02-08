import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithGoogle, loginWithEmail, registerWithEmail } from "./auth";

// Валідація через yup
const schema = yup.object().shape({
  email: yup.string().email("Невірний email").required("Обов'язкове поле"),
  password: yup.string().min(6, "Мінімум 6 символів").required("Обов'язкове поле"),
});

const AuthModal = ({ isOpen, onClose, mode = "login" }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Закриття по ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Функції відправки форми
  const onSubmit = async (data) => {
    try {
      if (mode === "login") {
        const user = await loginWithEmail(data.email, data.password);
        console.log("Увійшов:", user.email);
      } else {
        const user = await registerWithEmail(data.email, data.password);
        console.log("Зареєстрований користувач:", user.email);
      }
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Увійшов через Google:", user.displayName);
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // Закриття по backdrop
    >
      <div
        className="bg-white p-6 rounded-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} // Не закриваємо при кліку всередині модалки
      >
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl mb-4">{mode === "login" ? "Увійти" : "Реєстрація"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input
            type="password"
            placeholder="Пароль"
            {...register("password")}
            className="border p-2 rounded"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            {mode === "login" ? "Увійти" : "Зареєструватися"}
          </button>
        </form>

        <hr className="my-4" />

        <button
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-600 transition"
        >
          Увійти через Google
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
