// src/pages/Home/Home.jsx
import Header from "../../components/Header/Header.js";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <Header />

      <section className={styles.hero}>
        {/* ЛІВА ЧАСТИНА */}
        <div className={styles.left}>
          <h1>Make Life Easier for the Family:</h1>
          <p>Find Babysitters Online for All Occasions</p>
          <button
            className={styles.button}
            onClick={() => window.location.assign("/nannies")}
          >
            Get started
          </button>
        </div>

        {/* ПРАВА ЧАСТИНА */}
        <div className={styles.right}>
          <div className={styles.overlayCard}>
            <div className={styles.iconBox}>✓</div>
            <p>Experienced nannies</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
