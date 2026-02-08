// src/components/NannyCard.jsx
import React from "react";

const NannyCard = ({ nanny, isFavorite, onFavoriteToggle }) => {
  return (
    <div className="border p-4 rounded relative">
      <img src={nanny.avatar_url} alt={nanny.name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold">{nanny.name}</h2>
      <p>Rating: {nanny.rating}</p>
      <button
        onClick={onFavoriteToggle}
        className={`absolute top-2 right-2 text-2xl ${isFavorite ? "text-red-500" : "text-gray-400"}`}
      >
        ♥
      </button>
    </div>
  );
};

export default NannyCard;
