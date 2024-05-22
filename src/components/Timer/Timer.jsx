import styles from "./Timer.module.scss";
import { memo, useEffect, useState } from "react";

function InitialTimer() {
  const [time, setTime] = useState({ minutes: 59, seconds: 59 });

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + 60 * 60 * 1000;

    const updateTimer = () => {
      const remainingTime = endTime - Date.now();
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);
      setTime({ minutes, seconds });
    };

    const timerInterval = setInterval(updateTimer, 1000);

    updateTimer();

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className={styles["timer"]}>
      {`${time.minutes.toString().padStart(2, "0")}:${time.seconds
        .toString()
        .padStart(2, "0")}`}
    </div>
  );
}

export const Timer = memo(InitialTimer);
