// src/components/NannyCard/NannyCard.tsx
import { useState } from "react";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import css from "./NannyCard.module.css";

const NannyCard = ({ nanny, isFavorite, onFavoriteToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
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

          <ul className={css.nannyBadges}>
            <li><strong>Age:</strong> {nanny.age}</li>
            <li><strong>Experience:</strong> {nanny.experience} years</li>
            <li><strong>Kids age:</strong> {nanny.kids_age}</li>
            <li><strong>Education:</strong> {nanny.education}</li>
            <li><strong>Characters:</strong> {nanny.characters}</li>
          </ul>

          <p className={css.nannyAbout}>{nanny.about}</p>

          {/* 🔹 КНОПКИ В ПОЧАТКОВІЙ КАРТЦІ */}
          {!isExpanded && (
            <div className={css.nannyActions}>
              <button
                className={css.readMore}
                onClick={() => setIsExpanded(true)}
              >
                Read more
              </button>
            </div>
          )}

          {/* 🔹 РОЗГОРНУТА ЧАСТИНА */}
          {isExpanded && (
            <>
              <div className={css.expandedSection}>
                <p className={css.reviewsTitle}>Reviews:</p>

                {Array.isArray(nanny.reviews) &&
                  nanny.reviews.map((review, index) => (
                    <div key={index} className={css.reviewItem}>
                      <div className={css.reviewHeader}>
                        <div className={css.reviewAvatar}>
                          {review.reviewer?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className={css.reviewerName}>
                            {review.reviewer}
                          </p>
                          <p className={css.reviewRating}>
                            ⭐ {review.rating}
                          </p>
                        </div>
                      </div>

                      <p className={css.reviewComment}>
                        {review.comment}
                      </p>
                    </div>
                  ))}
              </div>

              {/* 🔹 Make an appointment ТІЛЬКИ ТУТ */}
              <div className={css.nannyActions}>
                <button
                  className={css.appointBtn}
                  onClick={() => setIsAppointOpen(true)}
                >
                  Make an appointment
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <AppointmentModal
        isOpen={isAppointOpen}
        onClose={() => setIsAppointOpen(false)}
        nanny={nanny}
      />
    </>
  );
};

export default NannyCard;