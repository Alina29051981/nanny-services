import React, { useEffect } from "react";

const ReadMoreModal = ({ isOpen, onClose, nanny }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded w-96 relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>
          ×
        </button>
        <h2 className="text-2xl font-bold mb-2">{nanny.name}</h2>
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

