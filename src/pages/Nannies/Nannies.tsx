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

type Nanny = {
  id: string;
  name?: string;
  price_per_hour: number;
};

type FilterType =
  | "az"
  | "za"
  | "lt10"
  | "gt10"
  | "popular"
  | "not_popular"
  | "all";

const filterLabels: Record<FilterType, string> = {
  az: "A to Z",
  za: "Z to A",
  lt10: "Less than 10$",
  gt10: "Greater than 10$",
  popular: "Popular",
  not_popular: "Not popular",
  all: "Show all",
};

const Nannies = () => {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [allNannies, setAllNannies] = useState<Nanny[]>([]);
  const [visibleNannies, setVisibleNannies] = useState(3);
  const [filter, setFilter] = useState<FilterType>("all");

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

  useEffect(() => {
    setVisibleNannies(3);
  }, [filter]);

  const handleToggleFavorite = async (nannyId: string) => {
    if (!user) {
      alert("This feature is available only for authorized users");
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
        case "lt10":
          return n.price_per_hour < 10;
        case "gt10":
          return n.price_per_hour >= 10;
        case "popular":
          return !!favorites[n.id];
        case "not_popular":
          return !favorites[n.id];
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (filter === "az") {
        return (a.name || "").localeCompare(b.name || "");
      }
      if (filter === "za") {
        return (b.name || "").localeCompare(a.name || "");
      }
      return 0;
    });

  const visibleList = filteredNannies.slice(0, visibleNannies);

  return (
    <section className={css.nanniesPage}>
      <div className={css.pageContainer}>
        <div className={css.contentContainer}>
          <p>Filters</p>

          <div className={css.filters}>
            <SortDropdown
              value={filter}
              onChange={setFilter}
              options={Object.entries(filterLabels).map(
                ([key, label]) => ({
                  value: key,
                  label,
                })
              )}
            />
          </div>

          <div className={css.grid}>
            {visibleList.map((nanny) => (
              <NannyCard
                key={nanny.id}
                nanny={nanny}
                isFavorite={!!favorites[nanny.id]}
                onFavoriteToggle={() =>
                  handleToggleFavorite(nanny.id)
                }
              />
            ))}
          </div>

          {visibleNannies < filteredNannies.length && (
            <button
              className={css.loadMore}
              onClick={() =>
                setVisibleNannies((prev) => prev + 3)
              }
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Nannies;