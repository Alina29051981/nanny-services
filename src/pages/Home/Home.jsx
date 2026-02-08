import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Home.module.css";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h1>Nanny Services</h1>
      <p>Find the perfect nanny for your child</p>

      {user ? (
        <Link to="/nannies" className={styles.button}>
          Go to Nannies
        </Link>
      ) : (
        <Link to="/login" className={styles.button}>
          Login to start
        </Link>
      )}
    </div>
  );
};

export default Home;
