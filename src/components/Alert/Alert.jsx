import { useContext, useEffect, useState } from "react";
import styles from "./Alert.module.scss";
import { useMyContext } from "../../context/MyContext/MyContext";

export function Alert() {
  const { showAlert, setShowAlert } = useMyContext();

  return (
    <div className={`${styles.div} ${showAlert.isVisible ? "" : styles.none}`}>
      {showAlert.preText}
      <br />
      {showAlert.text}
    </div>
  );
}
