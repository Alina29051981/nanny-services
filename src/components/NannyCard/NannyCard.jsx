// src/components/NannyCard/NannyCard.jsx
// src/components/NannyCard/NannyCard.jsx
import { useState } from "react";
import ReadMoreModal from "../ReadMoreModal/ReadMoreModal";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import css from "./NannyCard.module.css";

const NannyCard = ({ nanny, isFavorite, onFavoriteToggle }) => {
  const [isReadOpen, setIsReadOpen] = useState(false);
  const [isAppointOpen, setIsAppointOpen] = useState(false);

  return (
    <>
      <div className={css.nannyCard}>
        <div className={css.nannyAvatar}>
          <img src={nanny.avatar_url} alt={nanny.name} />
        </div>

        <div className={css.nannyContent}>
          <div className={css.nannyHeader}>
            <div>
              <p className={css.nannyRole}>Nanny</p>
              <h2>{nanny.name}</h2>
            </div>

            <button
              className={`${css.favoriteBtn} ${isFavorite ? css.active : ""}`}
              onClick={onFavoriteToggle}
            >
              ♥
            </button>
          </div>

          {/* Семантичний список */}
          <ul className={css.nannyBadges}>
            <li><strong>Age:</strong> {nanny.age}</li>
            <li><strong>Experience:</strong> {nanny.experience} years</li>
            <li><strong>Kids age:</strong> {nanny.kids_age}</li>
            <li><strong>Education:</strong> {nanny.education}</li>
            <li><strong>Characters:</strong> {nanny.characters}</li>
          </ul>

          <p className={css.nannyAbout}>{nanny.about}</p>

          <div className={css.nannyActions}>
            <button
              className={css.readMore}
              onClick={() => setIsReadOpen(true)}
            >
              Read more
            </button>

            <button
              className={css.appointBtn}
              onClick={() => setIsAppointOpen(true)}
            >
              Make an appointment
            </button>
          </div>
        </div>
      </div>

      <ReadMoreModal
        isOpen={isReadOpen}
        onClose={() => setIsReadOpen(false)}
        nanny={nanny}
      />

      <AppointmentModal
        isOpen={isAppointOpen}
        onClose={() => setIsAppointOpen(false)}
        nanny={nanny}
      />
    </>
  );
};

export default NannyCard;
