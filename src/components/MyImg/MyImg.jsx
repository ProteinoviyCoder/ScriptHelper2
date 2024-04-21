import { memo, useEffect, useState } from "react";
import styles from "./MyImg.module.scss";

function InitialMyImg({ srcImg, showImgFull, setShowImgFull }) {
  return (
    <div
      onClick={() => {
        setShowImgFull(false);
      }}
      className={`${styles["div-images-full"]} ${
        showImgFull ? "" : styles["none"]
      }`}
    >
      <img className={styles["img-full"]} src={srcImg} alt="#" />
    </div>
  );
}

export const MyImg = memo(InitialMyImg);
