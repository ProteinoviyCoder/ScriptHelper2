import { memo, useEffect, useRef, useState } from "react";
import styles from "./SideBar.module.scss";

function InitialSideBar() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const saveWrite = (e) => {
    const dataText = e.target.value;
    localStorage.setItem("notePad", JSON.stringify(dataText));
  };

  const refTextarea = useRef(null);

  return (
    <div className={`${styles["side-bar"]} `}>
      <div
        className={`${styles["content__side-bar"]} ${
          isOpenSideBar ? styles["openSideBar"] : styles["none"]
        }`}
      >
        <p style={{ fontSize: 24 }}>Блокнот</p>
        <br />
        <textarea
          ref={refTextarea}
          className={styles["textarea"]}
          name="notes"
          id="notes"
          onInput={(e) => saveWrite(e)}
        ></textarea>
      </div>
      <div
        onClick={() => {
          setIsOpenSideBar(!isOpenSideBar);
          refTextarea.current.value = JSON.parse(
            localStorage.getItem("notePad")
          );
        }}
        className={`${styles["button__side-bar"]}`}
      >
        <img
          className={`${styles["img"]} ${isOpenSideBar ? styles["none"] : ""}`}
          src="/note.png"
          alt="#"
        />
        <i
          className={`${styles["arrow-right"]}  ${
            isOpenSideBar ? "" : styles["none"]
          }`}
        ></i>
      </div>
    </div>
  );
}

export const SideBar = memo(InitialSideBar);
