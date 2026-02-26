// src/components/NannyInfo/NannyInfo.tsx
import css from "./NannyInfo.module.css";
import type { Nanny } from "../../types/Nanny";

const NannyInfo = ({ nanny }: { nanny: Nanny }) => {
  return (
    <div className={css.nannyBlock}>
      <img
        src={nanny.avatar_url}
        alt={nanny.name}
        className={css.nannyAvatar}
      />
      <div>
        <p className={css.yourNanny}>Your nanny</p>
        <p className={css.nannyName}>{nanny.name}</p>
      </div>
    </div>
  );
};

export default NannyInfo;