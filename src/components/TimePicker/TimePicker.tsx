// src/components/TimePicker/TimePicker.tsx
import { useMemo, useState, useRef, useEffect } from "react";
import css from "./TimePicker.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const TimePicker = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.timeWrapper} ref={wrapperRef}>
      <input
        type="text"
        readOnly
        placeholder="00:00"
        value={value}
        className={css.timeInput}
        onClick={() => setOpen((prev) => !prev)}
      />

      <input
        type="hidden"
        name="time"
        value={value}
      />

           <svg className={css.clockIcon}>
        <use href="/sprite.svg#icon-clock" />
      </svg>

      {open && (
        <div className={css.timeDropdown}>
          <div className={css.dropdownHeader}>
            Meeting time
          </div>

          <div className={css.optionsList}>
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
        </div>
      )}
    </div>
  );
};

export default TimePicker;