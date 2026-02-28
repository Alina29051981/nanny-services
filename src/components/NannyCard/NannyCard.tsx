// src/components/NannyCard/NannyCard.tsx
import { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import css from "./NannyCard.module.css";

const NannyCard = ({ nanny, isFavorite, onFavoriteToggle }) => {
  const { user } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppointOpen, setIsAppointOpen] = useState(false);

  if (!nanny) return null; 

  const age = useMemo(() => {
    if (!nanny?.birthday) return null;

    const birthDate = new Date(nanny.birthday);
    const today = new Date();

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge;
  }, [nanny?.birthday]);

  return (
    <>
      <div className={css.nannyCard}>
        <div className={css.nannyAvatar}>
          <div className={css.avatarWrapper}>
            <img
              src={nanny?.avatar_url}
              alt={nanny?.name}
              className={css.avatar}
            />

            <svg
              className={`${css.statusDot} ${
                nanny?.isOnline ? css.online : css.offline
              }`}
              width="14"
              height="14"
            >
              <use href="/sprite.svg#icon-status-dot" />
            </svg>
          </div>
        </div>

        <div className={css.nannyContent}>
          <div className={css.nannyHeader}>
            <div className={css.nannyTitle}>
              <p className={css.nannyRole}>Nanny</p>
              <h2>{nanny?.name}</h2>
            </div>

            <ul className={css.nannyBadges}>
              {nanny?.location && (
                <li className={css.locationItem}>
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-map-pin" />
                  </svg>
                  {nanny.location}
                </li>
              )}

              {nanny?.rating && (
                <li className={css.ratingItem}>
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-star" />
                  </svg>
                  Rating: {nanny.rating}
                </li>
              )}

              {nanny?.price_per_hour && (
                <li className={css.priceItem}>
                  Price /1 hour:{" "}
                  <span className={css.priceValue}>
                    ${nanny.price_per_hour}
                  </span>
                </li>
              )}
            </ul>

            {user && (
              <button
                className={`${css.favoriteBtn} ${
                  isFavorite ? css.active : ""
                }`}
                onClick={onFavoriteToggle}
              >
                <svg width="26" height="26">
                  <use
                    href={`/sprite.svg#${
                      isFavorite
                        ? "icon-heart-filled"
                        : "icon-heart-outline"
                    }`}
                  />
                </svg>
              </button>
            )}
          </div>

          <ul className={css.nannyResume}>
            {age !== null && (
              <li className={css.resumeItem}>
                <span className={css.label}>Age:</span>
                <span className={css.value}>{age}</span>
              </li>
            )}

            <li className={css.resumeItem}>
              <span className={css.label}>Experience:</span>
              <span className={css.value}>{nanny?.experience}</span>
            </li>

            <li className={css.resumeItem}>
              <span className={css.label}>Kids age:</span>
              <span className={css.value}>{nanny?.kids_age}</span>
            </li>

            <li className={css.resumeItem}>
              <span className={css.label}>Education:</span>
              <span className={css.value}>{nanny?.education}</span>
            </li>
          </ul>

          <p className={css.nannyAbout}>{nanny?.about}</p>

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

          {isExpanded && (
            <>
              <div className={css.expandedSection}>
                {Array.isArray(nanny?.reviews) &&
                  nanny.reviews.map((review, index) => (
                    <div key={index} className={css.reviewItem}>
                      <div className={css.reviewHeader}>
                        <div className={css.reviewAvatar}>
                          {review?.reviewer
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className={css.reviewerName}>
                            {review?.reviewer}
                          </p>
<div className={css.reviewWrapper}>
  <svg width="16" height="16">
    <use href="/sprite.svg#icon-star" />
  </svg>

  <span className={css.reviewRating}>
    {review?.rating}
  </span>
</div>
                        </div>
                      </div>

                      <p className={css.reviewComment}>
                        {review?.comment}
                      </p>
                    </div>
                  ))}
              </div>

              {user && (
                <div className={css.nannyActions}>
                  <button
                    className={css.appointBtn}
                    onClick={() => setIsAppointOpen(true)}
                  >
                    Make an appointment
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {user && (
        <AppointmentModal
          isOpen={isAppointOpen}
          onClose={() => setIsAppointOpen(false)}
          nanny={nanny}
        />
      )}
    </>
  );
};

export default NannyCard;