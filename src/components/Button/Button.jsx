import { memo, useState } from "react";
import styles from "./Button.module.scss";

function InitialButton({ children, onClick }) {
  const [clickAnim, setClickAnim] = useState(false);

  function doAnimClick() {
    setClickAnim(true);
    setTimeout(() => {
      setClickAnim(false);
    }, 225);
  }

  return (
    <button
      onClick={(e) => {
        onClick(e);
        doAnimClick();
      }}
      className={`${clickAnim ? styles["animClick"] : ""} ${styles["button"]}`}
    >
      <i></i>
      <div>
        <p>{children}</p>
      </div>
    </button>
  );
}

export const Button = memo(InitialButton);
