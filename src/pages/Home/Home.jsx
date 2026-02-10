// src/pages/Home/Home.jsx

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../../components/AuthModal/AuthModal"; 
import styles from "./Home.module.css";

const Home = () => {
  const { user } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mode, setMode] = useState("login");

  return (
    <div className={styles.container}>
      <h1>Nanny Services</h1>
      <p>Find the perfect nanny for your child</p>

      {user ? (
        <button
          className={styles.button}
          onClick={() => window.location.assign("/nannies")}
        >
          Go to Nannies
        </button>
      ) : (
        <>
          <button
            className={styles.button}
            onClick={() => { setMode("login"); setIsAuthOpen(true); }}
          >
            Login to start
          </button>

          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            mode={mode}
          />
        </>
      )}
    </div>
  );
};

export default Home;
