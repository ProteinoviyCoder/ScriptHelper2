import styles from "./Footer.module.scss";
import { MoscowTime } from "../MoscowTime/MoscowTime";
import { Stopwatch } from "../Stopwatch/Stopwatch";
import { memo, useEffect, useRef, useState } from "react";
import { useMyContext } from "../../context/MyContext/MyContext";

function InitialFooter({ footerStyle, footerSetings }) {
  const { isOpenTimerTask, setIsOpenTimerTask } = useMyContext();
  const iconArrow = useRef(null);
  const divTaskTimerRef = useRef(null);

  const openTimerTask = (e) => {
    if (isOpenTimerTask === false) {
      divTaskTimerRef.current.style.width = "310px";
      iconArrow.current.style.transform = "rotate(135deg)";
      iconArrow.current.style.marginRight = "12px";
      setIsOpenTimerTask(true);
    } else {
      divTaskTimerRef.current.style.width = "";
      iconArrow.current.style.transform = "";
      iconArrow.current.style.marginRight = "";
      setIsOpenTimerTask(false);
    }
  };

  useEffect(() => {
    if (isOpenTimerTask) {
      divTaskTimerRef.current.style.width = "310px";
      iconArrow.current.style.transform = "rotate(135deg)";
      iconArrow.current.style.marginRight = "12px";
    }
  }, []);

  return (
    <footer className={`${styles.footer} ${footerStyle}`}>
      <div className="container">
        <div className={styles["footer-content"]}>
          {footerSetings ? footerSetings.leftContent : <div></div>}
          <div>
            <MoscowTime></MoscowTime>
          </div>
          {footerSetings ? footerSetings.rightContent : <div></div>}
        </div>
      </div>
      <></>
      {/* <div ref={divTaskTimerRef} className={styles["div-timer-task"]}>
        <button
          onClick={(e) => openTimerTask(e)}
          className={styles["button-timer-task"]}
        >
          <i ref={iconArrow}></i>
        </button>
        <Stopwatch></Stopwatch> 
      </div> */}
    </footer>
  );
}

export const Footer = memo(InitialFooter);
