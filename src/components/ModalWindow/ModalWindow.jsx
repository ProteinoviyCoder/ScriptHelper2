import { memo, useEffect, useRef, useState } from "react";
import styles from "./ModalWindow.module.scss";

function InitialModalWindow({
  contentMidleModlaWindow,
  showModal,
  setShowModal,
}) {
  const [isVisibleWindow, setIsVisibleWindow] = useState(false);

  const refWindow = useRef(null);
  const refBtnClose = useRef(null);

  const closeWindow = (e) => {
    if (e.target === refWindow.current || e.target === refBtnClose.current) {
      setIsVisibleWindow(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    setIsVisibleWindow(showModal);
  }, [showModal]);

  return (
    <div
      ref={refWindow}
      onMouseDown={(e) => closeWindow(e)}
      className={` ${
        isVisibleWindow ? styles["background__modal-window"] : styles["none"]
      }`}
    >
      <div className={`${styles["modal-window"]} anim-open-window`}>
        <div className={styles["top__modal"]}>
          <h2 className={styles["title__modal"]}>Script-Helper</h2>
          <button
            ref={refBtnClose}
            onClick={(e) => closeWindow(e)}
            className={`${styles["btn-layout"]}`}
            style={{ padding: "7px 13px" }}
          >
            x
          </button>
        </div>
        <div className={styles["midle__modal"]}>{contentMidleModlaWindow}</div>
        <div className={styles["bottom__modal"]}></div>
      </div>
    </div>
  );
}

export const ModalWindow = memo(InitialModalWindow);
