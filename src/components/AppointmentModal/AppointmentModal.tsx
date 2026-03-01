// src/components/AppointmentModal/AppointmentModal.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./AppointmentModal.module.css";

import NannyInfo from "../NannyInfo/NannyInfo";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

import type { Nanny } from "../../types/Nanny";
import type { FormData } from "../../types/FormData";
import { useFormPersistence } from "../../hooks/useFormPersistence";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nanny: Nanny | null;
}

const STORAGE_KEY = "appointment-form-data";

const schema = yup.object({
  address: yup.string().min(3).required("Required"),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, "Phone must be +380XXXXXXXXX")
    .required("Required"),
  childAge: yup
    .number()
    .typeError("Must be a number")
    .min(0)
    .max(18)
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  time: yup.string().required("Required"),
  parentName: yup.string().min(2).required("Required"),
  comment: yup.string().max(500),
});

const AppointmentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  nanny,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { phone: "+380" },
  });

  const { reset } = form;

  useFormPersistence(form, STORAGE_KEY);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !nanny) return null;

  const handleSuccess = () => {
    localStorage.removeItem(STORAGE_KEY);
    reset({ phone: "+380" });

    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.closeIcon}>
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <h2 className={css.title}>
          Make an appointment with a babysitter
        </h2>

        <p className={css.description}>
          Arranging a meeting with a caregiver for your child is the first step to creating a safe and comfortable environment. Fill out the form below so we can match you with the perfect care partner.
        </p>

        <NannyInfo nanny={nanny} />

        <AppointmentForm
          form={form}
          onSuccess={handleSuccess}
        />

        {isSuccess && (
          <div className={css.successPopup}>
            Appointment successfully sent!
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;