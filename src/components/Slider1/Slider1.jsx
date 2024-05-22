import { memo, useEffect, useRef, useState } from "react";
import styles from "./Slider1.module.scss";

function InitialSlider1() {
  const myImgForSlider = [
    "/ScriptHelper2/slide1.jpg",
    "/ScriptHelper2/slide2.jpg",
    "/ScriptHelper2/slide3.jpg",
    "/ScriptHelper2/slide4.jpg",
    "/ScriptHelper2/slide5.jpg",
  ];

  let countSlide = 0;
  const contentSlider = useRef(null);

  const showNextSlide = (e) => {
    if (countSlide < myImgForSlider.length - 1) {
      const widthSlide = contentSlider.current.firstElementChild.offsetWidth;
      contentSlider.current.scrollBy({ left: widthSlide, behavior: "smooth" });

      countSlide = countSlide + 1;
    } else {
      contentSlider.current.scrollTo({ left: 0, behavior: "smooth" });
      countSlide = 0;
    }
  };

  const showPrevSlide = (e) => {
    if (countSlide > 0) {
      const widthSlide = contentSlider.current.firstElementChild.offsetWidth;
      contentSlider.current.scrollBy({ left: -widthSlide, behavior: "smooth" });

      countSlide = countSlide - 1;
    } else {
      const widthAllSlides =
        contentSlider.current.firstElementChild.offsetWidth *
        (myImgForSlider.length - 1);
      contentSlider.current.scrollTo({
        left: widthAllSlides,
        behavior: "smooth",
      });

      countSlide = myImgForSlider.length - 1;
    }
  };

  const updateSizeSlide = () => {
    const widthSlide = contentSlider.current.firstElementChild.offsetWidth;
    contentSlider.current.scrollTo({ left: widthSlide * countSlide });
    console.log(countSlide);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSizeSlide);

    return () => {
      window.removeEventListener("resize", updateSizeSlide);
    };
  }, []);

  return (
    <>
      <div className={styles["my-slider-841"]}>
        <div
          onClick={(e) => {
            showPrevSlide(e);
          }}
          className={styles["my-prev-btn-slider-841"]}
        >
          <i></i>
        </div>
        <div ref={contentSlider} className={styles["my-content-slider-841"]}>
          {myImgForSlider.map((img) => {
            return (
              <img
                className={styles["my-slide-841"]}
                key={img}
                src={img}
                alt="#"
              />
            );
          })}
        </div>
        <div
          onClick={(e) => {
            showNextSlide(e);
          }}
          className={styles["my-next-btn-slider-841"]}
        >
          <i></i>
        </div>
      </div>
    </>
  );
}

export const Slider1 = memo(InitialSlider1);
