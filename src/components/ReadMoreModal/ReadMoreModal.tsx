// src/components/ReadMoreModal/ReadMoreModal.tsx
import { useEffect } from "react";
import css from "./ReadMoreModal.module.css";

const ReadMoreModal = ({ isOpen, onClose, nanny }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={css.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={css.title}>{nanny.name}</h2>

        <p><strong>About:</strong> {nanny.about}</p>
        <p><strong>Experience:</strong> {nanny.experience} years</p>
        <p><strong>Education:</strong> {nanny.education}</p>
        <p><strong>Kids age:</strong> {nanny.kids_age}</p>
        <p><strong>Reviews:</strong> {nanny.reviews}</p>
        <p><strong>Characters:</strong> {nanny.characters}</p>
      </div>
    </div>
  );
};

export default ReadMoreModal;