import { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext("defaultValue");

export const MyProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState({
    preText: "Скопировано",
    text: "",
    isVisible: false,
  });

  const dataTimeNotif = () => {
    if (localStorage.getItem("timeNotif") !== null) {
      return JSON.parse(localStorage.getItem("timeNotif"));
    } else {
      return [];
    }
  };
  const [timeNotif, setTimeNotif] = useState(dataTimeNotif());
  const [isFirstRenderContext, setIsFirstRenderContext] = useState(true);
  const [isOpenTimerTask, setIsOpenTimerTask] = useState(false);
  const contextValue = {
    showAlert,
    setShowAlert,
    timeNotif,
    setTimeNotif,
    isFirstRenderContext,
    setIsFirstRenderContext,
    isOpenTimerTask,
    setIsOpenTimerTask,
  };

  async function notif() {
    if (
      JSON.parse(localStorage.getItem("notif")) === false ||
      JSON.parse(localStorage.getItem("notif")) === null
    ) {
      return;
    }

    const browserAllowed = await Notification.requestPermission();
    if (browserAllowed === "granted") {
      new Notification("Созвон");
    } else {
      return;
    }
  }

  function scheduleNotifications(data) {
    const [hours, minutes, seconds] = data.split(":");

    const timeLocal = new Date();
    const timeMoscow = new Date(
      timeLocal.toLocaleString("en-US", {
        timeZone: "Europe/Moscow",
      })
    );

    if (hours >= timeMoscow.getHours()) {
      const timeNotifHours = (+hours - +timeMoscow.getHours()) * 60 * 60;
      const timeNotifMinutes = (+minutes - +timeMoscow.getMinutes()) * 60;

      const totalTimeNotif = (timeNotifHours + timeNotifMinutes) * 1000;

      if (totalTimeNotif < 0) {
        return;
      }

      setTimeout(() => {
        notif();
      }, totalTimeNotif);
    }
  }

  useEffect(() => {
    if (isFirstRenderContext) {
      timeNotif.forEach((element) => {
        scheduleNotifications(element);
      });

      setIsFirstRenderContext(false);
    }
  }, [isFirstRenderContext]);

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
