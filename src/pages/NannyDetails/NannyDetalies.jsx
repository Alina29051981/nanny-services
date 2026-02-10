// src/pages/NannyDetalies/NannyDetalies.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, get } from "firebase/database";
import styles from "./NannyDetails.module.css";

const NannyDetails = () => {
  const { id } = useParams();
  const [nanny, setNanny] = useState(null);

  useEffect(() => {
    const nannyRef = ref(db, `nannies/${id}`);
    get(nannyRef).then((snapshot) => {
      if (snapshot.exists()) {
        setNanny(snapshot.val());
      }
    });
  }, [id]);

  if (!nanny) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <img src={nanny.avatar_url} alt={nanny.name} />
      <h1>{nanny.name}</h1>
      <p><strong>Education:</strong> {nanny.education}</p>
      <p><strong>Experience:</strong> {nanny.experience}</p>
      <p><strong>About:</strong> {nanny.about}</p>
      <p><strong>Price:</strong> ${nanny.price_per_hour}/hour</p>
    </div>
  );
};

export default NannyDetails;
