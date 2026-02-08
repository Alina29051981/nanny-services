import React, { useEffect, useState } from "react";
import { onUserStateChange } from "../../auth";
import { getFavorites, addFavorite, removeFavorite } from "../../api/favorites";
import { getNannies } from "../../api/nannies";
import NannyCard from "../../components/NannyCard/NannyCard";

const Nannies = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [allNannies, setAllNannies] = useState([]);
  const [visibleNannies, setVisibleNannies] = useState(3);
  const [sort, setSort] = useState("asc");
  const [filterPrice, setFilterPrice] = useState([0, 100]);

  useEffect(() => {
    const unsubscribe = onUserStateChange(setUser);
    return () => unsubscribe();
  }, []);

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

  const handleLoadMore = () => {
    setVisibleNannies((prev) => prev + 3);
  };

  const filteredNannies = allNannies
    .filter((n) => n.price_per_hour >= filterPrice[0] && n.price_per_hour <= filterPrice[1])
    .sort((a, b) => (sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
    .slice(0, visibleNannies);

  return (
    <div>
      <h1>Наші няні</h1>

      {/* Фільтри */}
      <div className="flex gap-4 mb-4">
        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="asc">А → Я</option>
          <option value="desc">Я → А</option>
        </select>
        <input
          type="number"
          placeholder="мін ціна"
          onChange={(e) => setFilterPrice([Number(e.target.value), filterPrice[1]])}
        />
        <input
          type="number"
          placeholder="макс ціна"
          onChange={(e) => setFilterPrice([filterPrice[0], Number(e.target.value)])}
        />
      </div>

      {/* Картки */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredNannies.map((nanny) => (
          <NannyCard
            key={nanny.id}
            nanny={nanny}
            isFavorite={!!favorites[nanny.id]}
            onFavoriteToggle={() => handleToggleFavorite(nanny.id)}
          />
        ))}
      </div>

      {/* Load More */}
      {visibleNannies < allNannies.length && (
        <button
          onClick={handleLoadMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Nannies;
