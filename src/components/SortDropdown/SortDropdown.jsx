// src/components/SortDropdown/SortDropdown.tsx
import { useState, useRef, useEffect } from "react";
import styles from "./SortDropdown.module.css";

export default function SortDropdown({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      
      <div
        className={styles.selected}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value}

                <svg className={styles.arrow} width="20" height="20">
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
      </div>

           {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <div
              key={option}
              className={styles.option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}