// src/pages/Favorites.tsx

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../api/favorites";

import { getNannies } from "../api/nannies";

import NannyCard from "../components/NannyCard/NannyCard";

const Favorites = () => {
  const { user, loading } = useAuth();

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [nannies, setNannies] = useState([]);

  // 🔥 Завантаження даних після авторизації
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const fav = await getFavorites(user.uid);
        setFavorites(fav);

        const allNannies = await getNannies();
        setNannies(allNannies);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleToggleFavorite = async (nannyId: string) => {
    if (!user) return;

    try {
      if (favorites[nannyId]) {
        await removeFavorite(user.uid, nannyId);

        setFavorites((prev) => {
          const updated = { ...prev };
          delete updated[nannyId];
          return updated;
        });
      } else {
        await addFavorite(user.uid, nannyId);

        setFavorites((prev) => ({
          ...prev,
          [nannyId]: true,
        }));
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  // ⏳ Поки перевіряється авторизація
  if (loading) {
    return <p>Завантаження...</p>;
  }

  // 🚫 Якщо користувач не увійшов
  if (!user) {
    return <p>Будь ласка, увійдіть в систему</p>;
  }

  return (
    <div>
      <h1>Мої обрані няні</h1>

      {nannies.length === 0 && <p>Завантаження...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nannies
          .filter((nanny: any) => favorites[nanny.id])
          .map((nanny: any) => (
            <NannyCard
              key={nanny.id}
              nanny={nanny}
              isFavorite={!!favorites[nanny.id]}
              onFavoriteToggle={() => handleToggleFavorite(nanny.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Favorites;