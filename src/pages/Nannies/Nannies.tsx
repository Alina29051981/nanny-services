// src/pages/Nannies/Nannies.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getFavorites, addFavorite, removeFavorite } from "../../api/favorites";
import { getNannies } from "../../api/nannies";
import NannyCard from "../../components/NannyCard/NannyCard";
import Header from "../../components/Header/Header";
import css from "./Nannies.module.css";

const Nannies = () => {
  const { user } = useAuth(); // 🔥 ОЦЕ ГОЛОВНЕ

  const [favorites, setFavorites] = useState({});
  const [allNannies, setAllNannies] = useState([]);
  const [visibleNannies, setVisibleNannies] = useState(3);
  const [filter, setFilter] = useState("all");

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

  const filteredNannies = allNannies
    .filter((n) => {
      switch (filter) {
        case "less10":
          return n.price_per_hour < 10;
        case "more10":
          return n.price_per_hour >= 10;
        case "popular":
          return !!favorites[n.id];
        case "notPopular":
          return !favorites[n.id];
        default:
          return true;
      }
    })
   .sort((a, b) => {
  if (filter === "asc")
    return (a.name || "").localeCompare(b.name || "");

  if (filter === "desc")
    return (b.name || "").localeCompare(a.name || "");

  return 0;
})
    .slice(0, visibleNannies);

  return (
    <>
      <Header />
      <div className={css.page}>
        <h1>Our Nannies</h1>

        <div className={css.filters}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
            <option value="less10">Less than 10$</option>
            <option value="more10">Greater than 10$</option>
            <option value="popular">Popular</option>
            <option value="notPopular">Not popular</option>
            <option value="all">Show all</option>
          </select>
        </div>

        <div className={css.grid}>
          {filteredNannies.map((nanny) => (
            <NannyCard
              key={nanny.id}
              nanny={nanny}
              isFavorite={!!favorites[nanny.id]}
              onFavoriteToggle={() => handleToggleFavorite(nanny.id)}
            />
          ))}
        </div>

        {visibleNannies < allNannies.length && (
          <button
            className={css.loadMore}
            onClick={() => setVisibleNannies((p) => p + 3)}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default Nannies;
