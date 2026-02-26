import React from "react";
import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return <p className={css.text}>{message}</p>;
};

export default ErrorMessage;