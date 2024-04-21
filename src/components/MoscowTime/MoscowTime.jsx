import { useState, useEffect, memo } from "react";

function InitialMoscowTime() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const moscowTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Europe/Moscow",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const formattedTime = moscowTime.startsWith("24:")
        ? "00" + moscowTime.substring(2)
        : moscowTime;

      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div style={{ fontSize: 24 }}>{currentTime}</div>;
}

export const MoscowTime = memo(InitialMoscowTime);
