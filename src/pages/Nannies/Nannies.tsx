// src/pages/Nannies/Nannies.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../../api/favorites";
import { getNannies } from "../../api/nannies";
import NannyCard from "../../components/NannyCard/NannyCard";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import css from "./Nannies.module.css";

const Nannies = () => {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState({});
  const [allNannies, setAllNannies] = useState([]);
  const [visibleNannies, setVisibleNannies] = useState(3);
  const [filter, setFilter] = useState("Show all");

  useEffect(() => {
    const fetchData = async () => {
      const nannies = await getNannies();
      setAllNannies(nannies);

      if (user) {
        const fav = await getFavorites(user.uid);
        setFavorites(fav);
      }
    };

    fetchData();
  }, [user]);

  const handleToggleFavorite = async (nannyId) => {
    if (!user) {
      alert("Тільки для авторизованих користувачів");
      return;
    }

    if (favorites[nannyId]) {
      await removeFavorite(user.uid, nannyId);
      setFavorites((prev) => {
        const copy = { ...prev };
        delete copy[nannyId];
        return copy;
      });
    } else {
      await addFavorite(user.uid, nannyId);
      setFavorites((prev) => ({ ...prev, [nannyId]: true }));
    }
  };

  // 🔥 фільтрація + сортування (без slice)
  const filteredNannies = allNannies
    .filter((n) => {
      switch (filter) {
        case "Less than 10$":
          return n.price_per_hour < 10;
        case "Greater than 10$":
          return n.price_per_hour >= 10;
        case "Popular":
          return !!favorites[n.id];
        case "Not popular":
          return !favorites[n.id];
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (filter === "A to Z")
        return (a.name || "").localeCompare(b.name || "");

      if (filter === "Z to A")
        return (b.name || "").localeCompare(a.name || "");

      return 0;
    });

  // 🔥 що реально показуємо
  const visibleList = filteredNannies.slice(0, visibleNannies);

  return (
    <div className={css.nanniesPage}>
      <p>Filters</p>

      <div className={css.filters}>
        <SortDropdown
          value={filter}
          onChange={setFilter}
          options={[
            "A to Z",
            "Z to A",
            "Less than 10$",
            "Greater than 10$",
            "Popular",
            "Not popular",
            "Show all",
          ]}
        />
      </div>

      <div className={css.grid}>
        {visibleList.map((nanny) => (
          <NannyCard
            key={nanny.id}
            nanny={nanny}
            isFavorite={!!favorites[nanny.id]}
            onFavoriteToggle={() => handleToggleFavorite(nanny.id)}
          />
        ))}
      </div>

      {/* 🔥 правильна умова */}
      {visibleNannies < filteredNannies.length && (
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

export default Nannies;