import { memo, useEffect, useRef, useState } from "react";
import styles from "./Stopwatch.module.scss";

function InitialStopwatch() {
  const [isActiveStopwatch, setIsActiveStopwatch] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeForTask, setTimeForTask] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  const intervalRef = useRef(null);

  const startStopWatch = () => {
    if (!isActiveStopwatch) {
      setIsActiveStopwatch(true);
      localStorage.setItem("activeStopwatch", JSON.stringify(true));
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => {
                  localStorage.setItem("hours", JSON.stringify(prevHours + 1));
                  prevHours + 1;
                });
                return 0;
              }
              localStorage.setItem("minutes", JSON.stringify(prevMinutes + 1));
              return prevMinutes + 1;
            });
            return 0;
          }
          localStorage.setItem("seconds", JSON.stringify(prevSeconds + 1));
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      setIsActiveStopwatch(false);
      localStorage.setItem("activeStopwatch", JSON.stringify(false));
      clearInterval(intervalRef.current);

      const totalSeconds = seconds + minutes * 60 + hours * 60 * 60;
      const totalTime = (totalSeconds / 60 / 60).toFixed(2);
      setTimeForTask(totalTime);
    }
  };

  const reset = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    localStorage.setItem("activeStopwatch", JSON.stringify(false));
    localStorage.setItem("hours", JSON.stringify(0));
    localStorage.setItem("minutes", JSON.stringify(0));
    localStorage.setItem("seconds", JSON.stringify(0));
    setIsActiveStopwatch(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setTimeForTask(0);
  };

  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };

  useEffect(() => {
    if (localStorage.getItem("seconds") !== null) {
      const sec = JSON.parse(localStorage.getItem("seconds"));
      setSeconds(sec);
    }

    if (localStorage.getItem("minutes") !== null) {
      const min = JSON.parse(localStorage.getItem("minutes"));
      setMinutes(min);
    }

    if (localStorage.getItem("hours") !== null) {
      const hr = JSON.parse(localStorage.getItem("hours"));
      setHours(hr);
    }

    if (localStorage.getItem("activeStopwatch") !== null) {
      if (JSON.parse(localStorage.getItem("activeStopwatch")) === true) {
        startStopWatch();
      }
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className={styles["stopwatch"]}>
      <div className={styles["stopwatc-time"]}>
        <p ref={hoursRef} className={styles["hours-stopwatch"]}>
          {formatTime(hours)}
        </p>
        <p>:</p>
        <p ref={minutesRef} className={styles["minutes-stopwatch"]}>
          {formatTime(minutes)}
        </p>
        <p>:</p>
        <p ref={secondsRef} className={styles["seconds-stopwatch"]}>
          {formatTime(seconds)}
        </p>
      </div>
      <button
        onClick={() => {
          startStopWatch();
        }}
        className={`${styles["btn-stopwatch"]} ${
          isActiveStopwatch ? styles["red-btn"] : ""
        }`}
      >
        <img src="/ScriptHelper2/on.png" alt="#" />
      </button>
      <div className={styles["time-for-task"]}>{timeForTask}</div>
      <button
        onClick={() => {
          reset();
        }}
        className={styles["btn-reset"]}
      >
        <img src="/ScriptHelper2/reload.png" alt="#" />
      </button>
    </div>
  );
}

export const Stopwatch = memo(InitialStopwatch);
