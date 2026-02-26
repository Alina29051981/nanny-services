// src/pages/Favorites.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../../api/favorites.js";
import { getNannies } from "../../api/nannies.js";
import NannyCard from "../../components/NannyCard/NannyCard.js";
import css from "./Favorites.module.css"; 

const Favorites = () => {
  const { user, loading } = useAuth();

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [nannies, setNannies] = useState<any[]>([]);
  const [visibleNannies, setVisibleNannies] = useState(3);

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

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (!user) {
    return <p>Будь ласка, увійдіть в систему</p>;
  }

  const favoriteNannies = nannies.filter(
    (nanny: any) => favorites[nanny.id]
  );

  const visibleFavorites = favoriteNannies.slice(0, visibleNannies);

  return (
    <div className={css.favoritesPage}>
           {favoriteNannies.length === 0 && (
        <p>У вас поки немає обраних нянь</p>
      )}

      <div className={css.grid}>
        {visibleFavorites.map((nanny: any) => (
          <NannyCard
            key={nanny.id}
            nanny={nanny}
            isFavorite={!!favorites[nanny.id]}
            onFavoriteToggle={() => handleToggleFavorite(nanny.id)}
          />
        ))}
      </div>

      {visibleNannies < favoriteNannies.length && (
        <button
          className={css.loadMore}
          onClick={() => setVisibleNannies((prev) => prev + 3)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Favorites;