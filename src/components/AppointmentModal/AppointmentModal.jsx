import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Валідація
const schema = yup.object().shape({
  name: yup.string().required("Обов'язкове поле"),
  email: yup.string().email("Невірний email").required("Обов'язкове поле"),
  phone: yup.string().required("Обов'язкове поле"),
  date: yup.string().required("Обов'язкове поле"),
});

const AppointmentModal = ({ isOpen, onClose, nanny }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    console.log("Appointment request:", data, "for nanny:", nanny.name);
    alert(`Заявка відправлена для ${nanny.name}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded w-96 relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold mb-4">Make an appointment with {nanny.name}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input type="text" placeholder="Name" {...register("name")} className="border p-2 rounded"/>
          <p className="text-red-500 text-sm">{errors.name?.message}</p>

          <input type="email" placeholder="Email" {...register("email")} className="border p-2 rounded"/>
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input type="text" placeholder="Phone" {...register("phone")} className="border p-2 rounded"/>
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>

          <input type="date" {...register("date")} className="border p-2 rounded"/>
          <p className="text-red-500 text-sm">{errors.date?.message}</p>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
