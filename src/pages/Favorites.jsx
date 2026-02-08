// src/pages/Favorites.jsx
import React, { useEffect, useState } from "react";
import { onUserStateChange } from "../auth";
import { getFavorites, addFavorite, removeFavorite } from "../api/favorites";
import { getNannies } from "../api/nannies"; // твій API для нянь
import NannyCard from "../components/NannyCard/NannyCard";

const Favorites = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [nannies, setNannies] = useState([]);

  useEffect(() => {
    const unsubscribe = onUserStateChange(setUser);
    return () => unsubscribe();
  }, []);

  // Підвантажуємо дані нянь і favorites після авторизації
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const fav = await getFavorites(user.uid);
      setFavorites(fav);

      const allNannies = await getNannies(); // твій метод для Realtime DB
      setNannies(allNannies);
    };

    fetchData();
  }, [user]);

  // Обробка кліку на серце
  const handleToggleFavorite = async (nannyId) => {
    if (!user) {
      alert("Цей функціонал доступний лише для авторизованих користувачів");
      return;
    }

    if (favorites[nannyId]) {
      await removeFavorite(user.uid, nannyId);
      setFavorites((prev) => {
        const newFav = { ...prev };
        delete newFav[nannyId];
        return newFav;
      });
    } else {
      await addFavorite(user.uid, nannyId);
      setFavorites((prev) => ({ ...prev, [nannyId]: true }));
    }
  };

  return (
    <div>
      <h1>Мої обрані няні</h1>
      {nannies.length === 0 && <p>Завантаження...</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nannies.map((nanny) => (
          favorites[nanny.id] && (
            <NannyCard
              key={nanny.id}
              nanny={nanny}
              isFavorite={!!favorites[nanny.id]}
              onFavoriteToggle={() => handleToggleFavorite(nanny.id)}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default Favorites;
