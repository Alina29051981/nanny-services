import { useMemo, useState } from "react";
import css from "./TimePicker.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const TimePicker = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  const timeOptions = useMemo(() => {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        times.push(
          `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
        );
      }
    }
    return times;
  }, []);

  return (
    <div className={css.timeWrapper}>
      <input
        type="text"
        readOnly
        placeholder="00:00"
        value={value}
        className={css.timeInput}
        onClick={() => setOpen((p) => !p)}
      />

      <span className={css.clockIcon} />

      {open && (
        <div className={css.timeDropdown}>
          {timeOptions.map((time) => (
            <div
              key={time}
              className={css.timeOption}
              onClick={() => {
                onChange(time);
                setOpen(false);
              }}
            >
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimePicker;