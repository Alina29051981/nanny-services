// src/pages/Home/Home.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const [isTop, setIsTop] = useState(false);

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
         <div className={styles.leftGroup}>
        <h1>Make Life Easier for the Family:</h1>
        <p>Find Babysitters Online for All Occasions</p>

        <Link
          to="/nannies"
          className={styles.button}
          onMouseEnter={() => setIsTop(true)}
          onMouseLeave={() => setIsTop(false)}
        >
          Get started

          <svg className={styles.icon}>
            <use
              href={
                isTop
                  ? "/sprite.svg#icon-arrow-right"
                  : "/sprite.svg#icon-arrow-right-top"
              }
            />
          </svg>
        </Link>
        </div>
        </div>

      <div className={styles.right}>
  <div className={styles.overlayCard}>
    <div className={styles.iconBox}>
      <svg className={styles.tickIcon}>
        <use href="/sprite.svg#tick" />
      </svg>
    </div>

    <div className={styles.textBlock}>
      <p className={styles.inscription}>Experienced nannies</p>
      <p className={styles.count}>15,000</p>
    </div>
  </div>
</div>
    </section>
  );
};

export default Home;