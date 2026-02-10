// src/pages/Nannies/Nannies.jsx
import { useEffect, useState } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../../api/favorites";
import { getNannies } from "../../api/nannies";
import NannyCard from "../../components/NannyCard/NannyCard";
import { useAuth } from "../../context/AuthContext";
import css from "./Nannies.module.css";

const Nannies = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState({});
  const [allNannies, setAllNannies] = useState([]);
  const [visibleNannies, setVisibleNannies] = useState(3);
  const [sort, setSort] = useState("asc");
  const [filterPrice, setFilterPrice] = useState([0, 100]);

  useEffect(() => {
    const fetchData = async () => {
      const nannies = await getNannies();
      setAllNannies(nannies);

      if (user) {
        const fav = await getFavorites(user.uid);
        setFavorites(fav);
      } else {
        setFavorites({});
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
    .filter(
      (n) =>
        n.price_per_hour >= filterPrice[0] &&
        n.price_per_hour <= filterPrice[1]
    )
    .sort((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .slice(0, visibleNannies);

  return (
    <div className={css.page}>
      <h1>Our Nannies</h1>

      <div className={css.filters}>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>

        <input
          type="number"
          placeholder="Min price"
          onChange={(e) =>
            setFilterPrice([Number(e.target.value), filterPrice[1]])
          }
        />

        <input
          type="number"
          placeholder="Max price"
          onChange={(e) =>
            setFilterPrice([filterPrice[0], Number(e.target.value)])
          }
        />
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
  );
};

export default Nannies;
